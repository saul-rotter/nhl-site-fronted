import requests_cache
import nhl_data as nd
from flask import Flask
from flask_restful import abort, Api, Resource

requests_cache.install_cache(expire_after=4320)
app = Flask(__name__)
api = Api(app)
# Load teams from nhl API and load monkeypuck.com xG table
TEAMS = nd.pullNHLTeams()
# Get todays games from NHL api
GAMES = nd.pullNHLGames()


class TeamAPI(Resource):
    def get(self, team_id):
        abort_if_team_doesnt_exist(int(team_id))
        team = TEAMS[int(team_id)]
        return team.toJson()


class GameAPI(Resource):
    def get(self, game_id):
        abort_if_game_doesnt_exist(int(game_id))
        game = GAMES[int(game_id)]
        return game.toJson()


def abort_if_team_doesnt_exist(team_id):
    if team_id not in TEAMS:
        abort(404, message="Team {} doesn't exist".format(team_id))


def abort_if_game_doesnt_exist(game_id):
    if game_id not in GAMES:
        abort(404, message="Game {} doesn't exist".format(game_id))


# TeamList
# shows a list of all teams
class TeamList(Resource):
    def get(self):
        return list(map(lambda team: TEAMS[team].toJson(), TEAMS))


# GameList
# shows a list of all games
class GameList(Resource):
    def get(self):
        return list(map(lambda game: GAMES[game].toJson(), GAMES))


##
## Actually setup the Api resource routing here
##
api.add_resource(TeamList, "/teams")
api.add_resource(TeamAPI, "/teams/<team_id>")
api.add_resource(GameList, "/games")
api.add_resource(GameAPI, "/games/<game_id>")


if __name__ == "__main__":
    app.run(debug=True)
