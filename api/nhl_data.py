import pandas as pd
import requests
import io
from teams import Team
from datetime import datetime, timedelta
from games import Game


API_URL = "https://statsapi.web.nhl.com/api/v1"


def utc_to_est(utc_dt):
    return str(utc_dt - timedelta(hours=5))


def pullStatsCSV():
    url = "https://moneypuck.com/moneypuck/playerData/careers/gameByGame/all_teams.csv"
    # pylint: disable=missing-timeout
    csv = requests.get(url).text
    temp = pd.read_csv(io.StringIO(csv))
    temp = temp[(temp["season"] == 2022) & (temp["situation"] == "all")]
    return temp


def pullNHLGames():
    response = requests.get(  # pylint: disable=missing-timeout
        API_URL + "/schedule", params={"Content-Type": "application/json"}
    )
    schedule_json = (response.json())["dates"][0]
    games = {}
    for game in schedule_json["games"]:
        games[game["gamePk"]] = Game(
            game["gamePk"],
            utc_to_est(datetime.fromisoformat(game["gameDate"][:-1])),
            game["teams"]["home"]["team"]["id"],
            game["teams"]["away"]["team"]["id"],
            game["teams"]["away"]["score"],
            game["teams"]["home"]["score"],
            game["status"]["detailedState"],
        )
    return games


def pullNHLTeams():
    response = requests.get(  # pylint: disable=missing-timeout
        API_URL + "/teams", params={"Content-Type": "application/json"}
    )
    game_stats = pullStatsCSV()
    teams_json = (response.json())["teams"]
    teams_dict = {}
    for team in teams_json:
        teams_dict[team["id"]] = Team(
            team["abbreviation"],
            team["id"],
            game_stats[game_stats["team"] == team["abbreviation"]],
        )
    return teams_dict


# class MonkeyPuck:
#     def __init__(self):
#         self.xg_df = self.__pullMPCSV()
#         self.league_average_xg_home = self.league_average_xg_away = None

#     def __pullMPCSV(self):
#         url = "https://moneypuck.com/moneypuck/playerData/careers/gameByGame/all_teams.csv"
#         csv = requests.get(url).text
#         temp = pd.read_csv(io.StringIO(csv))
#         temp = temp[temp["season"] == 2022]
#         return self.__filterXGColumns(temp)

#     def __filterXGColumns(self, df):
#         columns = [
#             "gameId",
#             "opposingTeam",
#             "home_or_away",
#             "gameDate",
#             "season",
#             "xGoalsPercentage",
#             "team",
#             "situation",
#             "xGoalsPercentage",
#             "xOnGoalFor",
#             "xGoalsFor",
#             "goalsFor",
#             "shotsOnGoalFor",
#             "xGoalsAgainst",
#             "shotsOnGoalAgainst",
#             "goalsAgainst",
#             "xOnGoalAgainst",
#             "iceTime",
#         ]
#         return df[columns]

#     def getTeamDF(self, name, home_or_away):
#         return self.xg_df[
#             (self.xg_df["team"] == name) & (self.xg_df["situation"] == "5on5")
#         ]  # & (self.xg_df['home_or_away'] == ('HOME' if home_or_away else "AWAY"))]

#     def getXGAgainstTeam(self, name, home_or_away):
#         team_xg_df = self.getTeamDF(name, home_or_away)
#         return team_xg_df["xGoalsAgainst"].mean()

#     def getXGForTeam(self, name, home_or_away):
#         team_xg_df = self.getTeamDF(name, home_or_away)
#         return team_xg_df["xGoalsFor"].mean()

#     def getLeagueAverageXG(self, home_or_away):
#         team_xg_df = self.xg_df[
#             (self.xg_df["situation"] == "5on5")
#         ]  # & (self.xg_df['home_or_away'] == ('HOME' if home_or_away else "AWAY"))]
#         if home_or_away:
#             self.league_average_xg_home = (
#                 team_xg_df["xGoalsFor"].mean()
#                 if self.league_average_xg_home is None
#                 else self.league_average_xg_home
#             )
#             return self.league_average_xg_home
#         self.league_average_xg_away = (
#             team_xg_df["xGoalsFor"].mean()
#             if self.league_average_xg_away is None
#             else self.league_average_xg_away
#         )
#         return self.league_average_xg_away
