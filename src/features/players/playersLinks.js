import React from "react";
import { Link, Outlet } from "react-router-dom";

export function PlayerLink({ player }) {
  return (
    <div>
      <Link to={`/players/${player.playerId}`}>
        <img
          data-tip="Select player to view statistics"
          src={player.playerImage}
          alt={player.fullName}
          className="img-thumbnail"
        />
        <br />
        <div>{player.fullName}</div>
      </Link>
      <Outlet />
    </div>
  );
}
