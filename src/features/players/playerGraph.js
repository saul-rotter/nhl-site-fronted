import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PlayerGraph({ playerGames }) {
  return (
    <ResponsiveContainer width="100%" height="70%">
      <LineChart
        width={500}
        height={500}
        data={playerGames}
        margin={{
          top: 5,
          bottom: 5,
          left: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" label="Week" height={60} />
        <YAxis />
        <Tooltip labelFormatter={(label) => `Week ${label}`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="Cmp%"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Yd/Att" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PlayerGraph;
