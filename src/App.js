import React from 'react'
import './index.css';
import { Route, Routes } from 'react-router-dom'
import { GamesTable } from './features/games/GamesTable'
import { useSelector } from 'react-redux'
import { useGetAPITokenQuery } from './features/api/apiSlice'
import PlayersList from './features/players/playersList';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }
  
  renderResetButton(token) {
    if (!this.state.winner) {
      return;
    }

    return (
      <button onClick={() => this.resetGame()}>
        {"Reset Game"}
      </button>
    );
  }

  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
    });
  }

  handleClick(i) {
    if (this.state.winner || this.state.squares[i]) {
      return;
    }
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: calculateWinner(squares),
    });
  }

  render() {
    let status;
    if (this.state.winner) {
      status = 'Winner: ' + this.state.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)} 
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div >{this.renderResetButton()}</div>
      </div>
    );
  }
}

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board"> 
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const {
    data: token,
    isLoading: isTokenLoading,
    isFetching: isTokenFetching,
    isSuccess: isTokenSuccess,
    isError: isTokenError,
    error: tokenError,
  } = useGetAPITokenQuery()

  let playerList = <div></div>
  let playerPage = <div></div>
  if (isTokenSuccess) {
    playerList = <div><PlayersList token={token['token']}/></div>
    playerPage = <GamesTable token={token['token']}/>
  }
  return (
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              playerList
            }
          />
          <Route exact path="/players/:playerId" element={playerPage} />
        </Routes>
      </div>
  )
}

export default App