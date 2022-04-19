import React from "react";
import { Card, Button } from "react-bootstrap";

function PlayerCard({ player }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={player.playerImage} />
      <Card.Body>
        <Card.Title>{player.fullName}</Card.Title>
        <Card.Subtitle>
          <Card.Img src={player.teamImage} style={{ width: "9%" }} />
          {player.team}
        </Card.Subtitle>
        <Card.Text>TODO: ADD PLAYER STATS HERE</Card.Text>
        <Button variant="primary">Table </Button>
        <Button variant="primary">Graph </Button>
        <Button variant="primary">Compare QBs </Button>
      </Card.Body>
    </Card>
  );
}

export default PlayerCard;
