"""
Games Doc
"""
from odds import convertDecimalToAmericanOdds
from scipy.stats import poisson

MAX_GOALS = 7


class Game:
    def __init__(self, date, homeTeam, awayTeam, homeScore, awayScore, currentState):
        self.dateTime = date
        self.homeTeam = homeTeam
        self.awayTeam = awayTeam
        self.homeScore = homeScore
        self.awayScore = awayScore
        self.currentState = currentState

    def calculateGoalProbabilities(self, home, mp):
        goal_expentency = (
            self.getHomeGoalExpentency(mp) if home else self.getAwayGoalExpentency(mp)
        )
        probs = [poisson.pmf(k=i, mu=goal_expentency) for i in range(MAX_GOALS)]
        probs.append(1 - poisson.cdf(k=MAX_GOALS, mu=goal_expentency))
        return probs

    def calculateProbabilities(self, mp):
        home_probs = self.calculateGoalProbabilities(True, mp)
        away_probs = self.calculateGoalProbabilities(False, mp)
        odds_home_win = 0
        odds_away_win = 0
        for home_idx, home_prob in enumerate(home_probs):
            for away_idx, away_prob in enumerate(away_probs):
                score_odds = home_prob * away_prob
                if home_idx > away_idx:
                    odds_home_win = odds_home_win + score_odds
                elif home_idx < away_idx:
                    odds_away_win = odds_away_win + score_odds
        final_odds_home = convertDecimalToAmericanOdds(1 / odds_home_win)
        final_odds_away = convertDecimalToAmericanOdds(1 / odds_away_win)
        print(f"{self.homeTeam.name} {final_odds_home}")
        print(f"{self.awayTeam.name} {final_odds_away}")

    def getHomeGoalExpentency(self, mp):
        return (
            self.homeTeam.getOffenseStrength(mp)
            * self.awayTeam.getDefenseStrength(mp)
            * mp.getLeagueAverageXG(True)
        )

    def getAwayGoalExpentency(self, mp):
        return (
            self.awayTeam.getOffenseStrength(mp)
            * self.homeTeam.getDefenseStrength(mp)
            * mp.getLeagueAverageXG(False)
        )
