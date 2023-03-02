import os
import os.path
import pandas as pd


def convert_game_time(period, time):
    time_list = time.split(":")
    clock = (int(time_list[0]) * 60) + (int(time_list[1]))
    return int(period * 1200 - clock)


def get_a3z_game_data():
    os.chdir(os.path.dirname(__file__))

    filename = os.path.join(os.getcwd(), "Tracking-Table 1.csv")
    df = pd.read_csv(filename)
    df = df.drop(["Home", "Road", "Date"], axis=1)
    columns = list(df.drop("Period", axis=1).columns)
    df.dropna(how="all", inplace=True, subset=columns)
    # print(df.sort_values(by=["Period", "Time"], ascending=[True, False]).head())

    # 0:3 in all tables as the recombination
    # 3:20 is First group
    # 20:27 is U:AA color starts at 101
    # 27:32 is AB:AG color starts at 223

    df["Time"] = df["Time"].astype(str)

    df["Seconds"] = df.apply(
        lambda x: convert_game_time(x["Period"], x["Time"]), axis=1
    )
    return df.sort_values("Seconds").reset_index(drop=True)
