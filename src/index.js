import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
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
class Board extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
    };
  }


  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  renderResetBtn() {
    return <button onClick={() => {
      this.setState({
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: null,
      })
    }} >Reset Board</button>;
  }

  handleClick(i) {

    if (this.state.winner) {
      return;
    }

    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }



  render() {

    const winner = calculateWinner(this.state.squares);
    let status;
    const nextPlayer = (this.state.xIsNext ? 'X' : 'O');
    if (winner) {
      status = 'Winner: ' + winner;
      if (!this.state.winner) {
        this.setState({
          squares: this.state.squares.slice(),
          xIsNext: this.state.xIsNext,
          winner: winner
        });
      }
    } else {
      status = 'Next player: ' + nextPlayer;
    }


    return (
      <div className={'player' + nextPlayer}>
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
        <div>
          {this.renderResetBtn()}
        </div>
      </div>

    );
  }
}

class Game extends React.Component {
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
