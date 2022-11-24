from datetime import datetime, timedelta
from pysbr import NHL, Sportsbook, BestLines


nhl = NHL()
SB = Sportsbook()
markets = ["ml", "ps", "tot"]


def getBestLinesForGame(event_id, lookback=1):
    today = datetime.today()
    lookback_day = today - timedelta(days=lookback)
    bl = BestLines(event_id, nhl.market_ids(terms=["tot", "ml", "ps", 1]))

    return bl


def getSpread():
    return None


def getMoneyLine():
    return None


def getTotalGoals():
    return None


def convertDecimalToAmericanOdds(dec_odds):
    if dec_odds >= 2:
        return (dec_odds - 1) * 100
    return (-100) / (dec_odds - 1)
