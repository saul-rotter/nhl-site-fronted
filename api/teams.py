from functools import cached_property


class Team:
    def __init__(self, name, team_id, game_stats):
        self.name = name
        self.team_id = team_id
        self.game_stats = game_stats

    def toJson(self):
        return {
            "name": self.name,
            "team_id": self.team_id,
            "game_stats": self.game_stats.set_index("gameId").to_json(orient="index"),
        }

    @cached_property
    def getAvgXGFor(self):
        return self.game_stats["xGoalsFor"].mean()

    @cached_property
    def getAvgXGAgainst(self):
        return self.game_stats["xGoalsAgainst"].mean()

    def getDefenseStrength(self, league_average: float):
        return self.getAvgXGAgainst() / league_average

    def getOffenseStrength(self, league_average: float):
        return self.getAvgXGFor() / league_average
