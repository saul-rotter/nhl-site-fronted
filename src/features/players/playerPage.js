import React from "react";
import GameTable from "../../components/Table";
import { useGetPlayerGamesQuery } from "../games/gamesSlice";
import { useParams } from "react-router-dom";
import PlayerCard from "./playerCard";
import { Col, Row } from "react-bootstrap";
import { format } from "date-fns";
import PlayerChart from "./playerChart";

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
        <Row xs={2}>
          <Col>
            <PlayerCard player={games[0]} />
          </Col>
          <Col>
            <h2>Games</h2>
            <PlayerChart playerGames={games} />
          </Col>
        </Row>
      );
    }
  }

  function prepareColumns() {
    const columns = [
      {
        Header: "Week",
        accessor: "week",
        disableFilters: true,
        sticky: "left",
      },
      {
        Header: "Game Date",
        accessor: "gameDate",
        sticky: "left",
        Cell: ({ value }) => {
          return format(new Date(value), "MM/dd/yyyy");
        },
      },
      { Header: "Opponent", accessor: "opponent", sticky: "left" },
      { Header: "Attempts", accessor: "Att" },
      { Header: "Completions", accessor: "Cmp" },
      { Header: "Interceptions", accessor: "Int" },
      { Header: "Passing Touchdowns", accessor: "PsTD" },
      { Header: "Passing Yards", accessor: "PsYds" },
      { Header: "Sacks", accessor: "Sack" },
      { Header: "Rushes", accessor: "Rush" },
      { Header: "Rushing Yards", accessor: "RshYds" },
      { Header: "Rushing Touchdowns", accessor: "RshTD" },
      { Header: "Yds/Att", accessor: "Yd/Att" },
      { Header: "Cmp%", accessor: "Cmp%" },
    ];
    return columns;
  }

  return content;
}

export default PlayerPage;
