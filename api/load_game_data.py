# type: ignore

import numpy as np
import pandas as pd
import urllib.request
import json
from datetime import datetime, timedelta
import sys
import re
import requests


def utc_to_est(utc_dt):
    return utc_dt - timedelta(hours=5)


def get_nhl_game_events(gameId):
    with urllib.request.urlopen(
        f"https://statsapi.web.nhl.com/api/v1/game/{gameId}/feed/live"
    ) as reader:
        page = reader.read()

    data = json.loads(page.decode("latin-1"))
    start_time = utc_to_est(
        datetime.fromisoformat(data["gameData"]["datetime"]["dateTime"][:-1])
    )
    events = read_events_from_json(data["liveData"]["plays"]["allPlays"])
    events.drop(events[events["Team"] == ""].index, inplace=True)
    events["datetime_shifted"] = events["DateTime"].shift(1)
    events["datetime_shifted"].iloc[0] = start_time
    events["time_since_last_event"] = (events.DateTime - events.datetime_shifted).apply(
        lambda x: x.total_seconds()
    )

    def convert_game_time(period, time):
        time_list = time.split(":")
        clock = (int(time_list[0]) * 60) + (int(time_list[1]))
        return int(period * 1200 - clock)

    events["Time"] = events["Time"].astype(str)
    events["Seconds"] = events.apply(
        lambda x: convert_game_time(x["Period"], x["Time"]), axis=1
    )
    return events


def update_player_ids_from_json(teamdata):
    """
    Creates a data frame of player data from current game's json[liveData][boxscore] to update player ids.
    This method reads player ids, names, handedness, team, position, and number, and full joins to player ids.
    If there are any changes to player ids, the dataframe gets written to disk again.
    Parameters
    -----------
    teamdata : dict
        A json dict that is the result of api_page['liveData']['boxscore']['teams']
    """

    awayplayers = teamdata["away"]["players"]
    homeplayers = teamdata["home"]["players"]

    numplayers = len(awayplayers) + len(homeplayers)
    ids = ["" for i in range(numplayers)]
    names = ["" for i in range(numplayers)]
    teams = ["" for i in range(numplayers)]
    positions = ["" for i in range(numplayers)]
    nums = [-1 for i in range(numplayers)]
    handedness = ["" for i in range(numplayers)]

    for i, (pid, pdata) in enumerate(awayplayers.items()):
        idnum = pid[2:]
        name = pdata["person"]["fullName"]
        try:
            hand = pdata["person"]["shootsCatches"]
        except KeyError:
            hand = "N/A"
        try:
            num = pdata["jerseyNumber"]
            if num == "":
                raise KeyError
            num = int(num)
        except KeyError:
            num = -1
        pos = pdata["position"]["code"]

        ids[i] = idnum
        names[i] = name
        teams[i] = teamdata["away"]["team"]["triCode"]
        positions[i] = pos
        nums[i] = num
        handedness[i] = hand

    for i, (pid, pdata) in enumerate(homeplayers.items()):
        idnum = pid[2:]
        name = pdata["person"]["fullName"]
        try:
            hand = pdata["person"]["shootsCatches"]
        except KeyError:
            hand = "N/A"
        try:
            num = pdata["jerseyNumber"]
            if num == "":
                raise KeyError
            num = int(num)
        except KeyError:
            num = -1
        pos = pdata["position"]["code"]

        ids[i + len(awayplayers)] = idnum
        names[i + len(awayplayers)] = name
        teams[i + len(awayplayers)] = teamdata["home"]["team"]["triCode"]
        positions[i + len(awayplayers)] = pos
        nums[i + len(awayplayers)] = num
        handedness[i + len(awayplayers)] = hand
    gamedf = pd.DataFrame(
        {
            "ID": ids,
            "Name": names,
            "Team": teams,
            "Pos": positions,
            "#": nums,
            "Hand": handedness,
        }
    )
    return gamedf


def update_team_ids_from_json(teamdata):

    hid = teamdata["home"]["team"]["id"]
    url = "https://statsapi.web.nhl.com{0:s}".format(teamdata["home"]["team"]["link"])
    with urllib.request.urlopen(url) as reader:
        page = reader.read()
    teaminfo = json.loads(page.decode("latin-1"))
    hid = teaminfo["teams"][0]["id"]
    habbrev = teaminfo["teams"][0]["abbreviation"]
    hname = teaminfo["teams"][0]["name"]

    team_ids = pd.DataFrame({"ID": [hid], "Abbreviation": [habbrev], "Name": [hname]})

    rid = teamdata["away"]["team"]["id"]
    if rid not in team_ids.ID.values:
        url = "https://statsapi.web.nhl.com{0:s}".format(
            teamdata["away"]["team"]["link"]
        )
        with urllib.request.urlopen(url) as reader:
            page = reader.read()
        teaminfo = json.loads(page.decode("latin-1"))
        rid = teaminfo["teams"][0]["id"]
        rabbrev = teaminfo["teams"][0]["abbreviation"]
        rname = teaminfo["teams"][0]["name"]

        df = pd.DataFrame({"ID": [rid], "Abbreviation": [rabbrev], "Name": [rname]})
        team_ids = pd.concat([team_ids, df])
    return team_ids


def read_events_from_json(pbp):
    """
    Returns the NHL API url to scrape.
    Parameters
    -----------
    season : int
        The season of the game. 2007-08 would be 2007.
    game : int
        The game id. This can range from 20001 to 21230 for regular season, and 30111 to 30417 for playoffs.
        The preseason, all-star game, Olympics, and World Cup also have game IDs that can be provided.
    Returns
    --------
    pandas df
        Dataframe of the game's play by play data
    """
    index = list(range(len(pbp)))
    period = [-1 for i in range(len(pbp))]
    time = ["0:00" for i in range(len(pbp))]
    dateTime = [-1 for i in range(len(pbp))]
    event = ["NA" for i in range(len(pbp))]

    team = ["" for i in range(len(pbp))]
    p1 = [-1 for i in range(len(pbp))]
    p1role = ["" for i in range(len(pbp))]
    p2 = [-1 for i in range(len(pbp))]
    p2role = ["" for i in range(len(pbp))]
    xy = [(np.NaN, np.NaN) for i in range(len(pbp))]
    note = ["" for i in range(len(pbp))]

    for i in range(len(pbp)):
        period[i] = int(pbp[i]["about"]["period"])
        time[i] = pbp[i]["about"]["periodTimeRemaining"]

        dateTime[i] = utc_to_est(  # type: ignore
            datetime.fromisoformat(pbp[i]["about"]["dateTime"][:-1])
        )
        event[i] = pbp[i]["result"]["event"]

        try:
            xy[i] = (
                float(pbp[i]["coordinates"]["x"]),
                float(pbp[i]["coordinates"]["y"]),
            )
        except KeyError:
            pass
        try:
            team[i] = pbp[i]["team"]["triCode"]
        except KeyError:
            pass
        try:
            p1[i] = pbp[i]["players"][0]["player"]["id"]
            p1role[i] = pbp[i]["players"][0]["playerType"]
        except KeyError:
            pass
        try:
            p2[i] = pbp[i]["players"][1]["player"]["id"]
            p2role[i] = pbp[i]["players"][1]["playerType"]
        except KeyError:
            pass
        except IndexError:  # e.g. on a give or take
            pass

        try:
            note[i] = pbp[i]["result"]["description"]
        except KeyError:
            pass

        # print(period[i], time[i], event[i], xy[i], team[i], p1[i], p1role[i], p2[i], p2role[i])

    pbpdf = pd.DataFrame(
        {
            "Index": index,
            "Period": period,
            "Time": time,
            "DateTime": dateTime,
            "Event": event,
            "Team": team,
            "Actor": p1,
            "ActorRole": p1role,
            "Recipient": p2,
            "RecipientRole": p2role,
            "XY": xy,
            "Note": note,
        }
    )
    return pbpdf


def convertTime(timeString, period):
    timeString = timeString.strip()
    time = 60 * int(timeString.split(":")[0]) + int(timeString.split(":")[1])
    return time + 20 * 60 * max(0, period - 1)


# implement default args
season = sys.argv[1]
gameId = sys.argv[2]

awayPage = requests.get("http://www.nhl.com/scores/htmlreports/20222023/TV020489.HTM")
# awayPage = requests.get('http://www.nhl.com/scores/htmlreports/20142015/TV030227.HTM')
homePage = requests.get("http://www.nhl.com/scores/htmlreports/20222023/TH020489.HTM")


def parseTOI(text):
    playersText = text.split("playerHeading")

    # Game meta-data
    top = playersText[1]
    gameNumber = re.search(r':bold">Game (\d+)', top).group(1)
    gameDate = re.search(r'bold">(\w+, \w+ \d+, \d+)</td>', top).group(1)
    teamName = re.search(
        r'class="teamHeading \+ border" align="center">([\w \.-]+)</td', top
    ).group(1)

    # Process shift-by-shift data
    dfList = []
    for playerText in playersText[2:]:
        shifts = playerText.split("</tr>")
        nameNum = re.search("colspan=\"8\">(\d+) ([\w \.'-]+), ([\w \.'-]+)", shifts[0])
        playerNumber, lastName, firstName = nameNum.groups()
        # Text to find name/number
        shifts = playerText.split("<tr")
        shiftNumber = []
        shiftPeriod = []
        shiftStart = []
        shiftEnd = []
        for shiftText in shifts[2:]:
            shiftData = re.findall(r'border">([\w :]+)', shiftText)
            # Break when hitting summaries
            if not shiftData or shiftData[0] == "Per":
                break

            # Convert to Numeric
            period = shiftData[1]
            if period == "OT":
                period = 4
            else:
                period = int(period)
            shiftNumber.append(int(shiftData[0]))
            shiftPeriod.append(period)

            # Convert to TimeData
            shiftStart.append(convertTime(shiftData[2], period))
            shiftEnd.append(convertTime(shiftData[3], period))

        playerDf = pd.DataFrame(
            {
                "playerNumber": playerNumber,
                "team": teamName,
                "shiftNumber": shiftNumber,
                "shiftPeriod": shiftPeriod,
                "shiftStart": shiftStart,
                "shiftEnd": shiftEnd,
                "gameNumber": gameNumber,
                "gameDate": gameDate,
            }
        )
        dfList.append(playerDf)
    return pd.concat(dfList)


# def update_quick_gamelog_from_json(data):
#     """
#     Creates a data frame of basic game data from current game's json to update global BASIC_GAMELOG.
#     This method reads the season, game, date and time, venue, and team names, coaches, anc scores, joining to
#     BASIC_GAMELOG.
#     If there are any changes to BASIC_GAMELOG, the dataframe gets written to disk again.
#     Parameters
#     -----------
#     data : dict
#         The full json dict from the api_page
#     """
#     season = int(str(data["gameData"]["game"]["pk"])[:4])
#     game = int(str(data["gameData"]["game"]["pk"])[4:])
#     datetime = data["gameData"]["datetime"]["dateTime"]
#     try:
#         venue = data["gameData"]["venue"]["name"]
#     except KeyError:
#         venue = "N/A"
#     team_ids = update_team_ids_from_json(data)
#     hname = team_ids.query("ID == " + str(data["gameData"]["teams"]["home"]["id"]))
#     hname = hname["Abbreviation"].iloc[0]
#     rname = team_ids.query("ID == " + str(data["gameData"]["teams"]["away"]["id"]))
#     rname = rname["Abbreviation"].iloc[0]
#     try:
#         hcoach = data["liveData"]["boxscore"]["teams"]["home"]["coaches"][0]["person"][
#             "fullName"
#         ]
#     except IndexError:
#         hcoach = "N/A"
#     try:
#         rcoach = data["liveData"]["boxscore"]["teams"]["away"]["coaches"][0]["person"][
#             "fullName"
#         ]
#     except IndexError:
#         rcoach = "N/A"
#     hscore = data["liveData"]["boxscore"]["teams"]["home"]["teamStats"][
#         "teamSkaterStats"
#     ]["goals"]
#     rscore = data["liveData"]["boxscore"]["teams"]["away"]["teamStats"][
#         "teamSkaterStats"
#     ]["goals"]
#     gamedf = pd.DataFrame(
#         {
#             "Season": [season],
#             "Game": [game],
#             "Datetime": [datetime],
#             "Venue": [venue],
#             "Home": [hname],
#             "HomeCoach": [hcoach],
#             "HomeScore": [hscore],
#             "Away": [rname],
#             "AwayCoach": [rcoach],
#             "AwayScore": [rscore],
#         }
#     )
#     return gamedf


# def get_nhl_schedule(date, teamID=None):
#     "https://statsapi.web.nhl.com/api/v1/schedule?date=2022-12-17&teamId=3"
#     with urllib.request.urlopen(
#         f"https://statsapi.web.nhl.com/api/v1/schedule?date={date}&teamId={teamID}"
#     ) as reader:
#         page = reader.read()
#     data = json.loads(page.decode("latin-1"))
#     return


# def read_schedule_from_json(data):
#     games = data["dates"][0]["totalGames"]["games"]
#     link = games["link"]
#     dateTime = games["dateTime"][:-1]
#     return


def fetch_players(data):
    return


def fetch_teams(data):
    return


def fetch_game_data(data):
    return


def load_nhl_api(data):
    return
