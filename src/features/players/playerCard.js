import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

function PlayerCard({ player }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={player[0].playerImage} />
      <Card.Body>
        <Card.Title>{player[0].fullName}</Card.Title>
        <Card.Subtitle>
          <Card.Img src={player[0].teamImage} style={{ width: "9%" }} />
          {player[0].team}
        </Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>Yards Per Game: {player.YdsPerGame}</ListGroup.Item>
          <ListGroup.Item>Total TDs: {player.TotTDs}</ListGroup.Item>
          <ListGroup.Item>
            Season Completion %: {player.TotCmpPer}
          </ListGroup.Item>
          <ListGroup.Item>Total Ints: {player.TotInt}</ListGroup.Item>
        </ListGroup>
        <Button variant="primary">Compare QBs </Button>
      </Card.Body>
    </Card>
  );
}

export default PlayerCard;