import requests_cache
import nhl_data as nd


requests_cache.install_cache(expire_after=360)


def main():
    # Load teams from nhl API and load monkeypuck.com xG table
    teams_dict = nd.pullNHLTeams()
    # Get todays games from NHL api
    games = nd.pullNHLGames(teams_dict)
    return games
