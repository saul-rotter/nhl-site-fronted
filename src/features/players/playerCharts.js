import React from "react";
import { useState } from "react";
import { Col } from "react-bootstrap";
import PlayerGraph from "./playerGraph";
import { Button } from "react-bootstrap";
import GameTable from "../playerGames/GameTable";
import prepareColumns from "./columns";

function PlayerCharts({ playerGames }) {
  const [isTable, setTable] = useState(true);

  const handleClick = (showTable) => setTable(showTable);
  return (
    <Col>
      <h2>Games</h2>
      <Button
        variant={isTable ? "primary" : "secondary"}
        onClick={() => handleClick(true)}
      >
        Table{" "}
      </Button>
      <Button
        variant={!isTable ? "primary" : "secondary"}
        onClick={() => handleClick(false)}
      >
        Graph{" "}
      </Button>
      {isTable ? (
        <GameTable columns={prepareColumns()} data={playerGames} />
      ) : (
        <PlayerGraph playerGames={playerGames} />
      )}
    </Col>
  );
}

export default PlayerCharts;
