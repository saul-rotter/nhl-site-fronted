import React from "react";
import { useGetPlayerGamesQuery } from "../playerGames/playerGamesSlice";
import { useParams } from "react-router-dom";
import PlayerCard from "./playerCard";
import { Col, Row } from "react-bootstrap";
import PlayerCharts from "./playerCharts";

function PlayerPage({ token }) {
  const { playerId } = useParams();
  let content = <div></div>;
  if (token) {
    const { data: games, isSuccess } = useGetPlayerGamesQuery({
      token,
      playerId,
    });
    if (isSuccess) {
      content = (
        <Row xs={2} className="justify-content-space-evenly">
          <Col>
            <PlayerCard player={games} />
          </Col>
          <PlayerCharts playerGames={games} />
        </Row>
      );
    }
  }

  return content;
}

export default PlayerPage;
