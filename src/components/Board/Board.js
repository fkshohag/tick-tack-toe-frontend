import React, { Component } from 'react';
import Square from '../Square/Square';
import { connect } from 'react-redux';
import { setSquareValueAndChangeActivePlayer, createBoard, clearBoard, setActionValue, setActivePlayer } from '../../redux/index';
import './Board.css';
import DataService from '../../shared/services/DataService';
import store from '../../redux/createStore';

class Board extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tableCaption: "Game log system",
      actionData: []
    }
  }

  renderTableData() {
    return this.state.actionData.map((action, index) => {
      const { step, currentPlayer, nextPlayer, pressValue } = action
      return (
        <tr key={index}>
          <td>{step}</td>
          <td>{currentPlayer}</td>
          <td>{nextPlayer}</td>
          <td>{pressValue}</td>
        </tr>
      )
    })
  }

  componentDidMount() {
    this.props.createBoard();
    const api = new DataService('game-action')
    api.getAll().then((res)=>{
      let actionLogs = res.data
      this.setState({actionData:actionLogs})
      for(let index = 0; index < actionLogs.length; index++) {
        store.dispatch(setActionValue(
          actionLogs[index].step,
          actionLogs[index].currentPlayer,
          actionLogs[index].nextPlayer,
          actionLogs[index].pressValue
        ))
      }
      if(actionLogs.length > 0) {
        let activePlayer = actionLogs[actionLogs.length-1].nextPlayer
        store.dispatch(setActivePlayer(activePlayer))
      }
    }).catch((res)=>{})
  }

  componentWillUpdate() {
    const logs = this.props.actionLogs
    if(logs !== undefined) {
      if(logs.length !== undefined && logs.length > 0) {
        this.setState({actionData: logs})
      }
    }
  }

  render() {
    let { board, onSquareClick, winner, clearBoard } = this.props;
    let winnerText = '';
    if (winner === 'draw') {
      winnerText = 'Draw';
    } else if (winner === 1 || winner === 2) {
      winnerText = 'Player ' + winner + ' won!';
    }

    return (
      <div>
        <div className="board-wrapper">
          <div className="winnerText">{winnerText}</div>
          <div className="board">
            {board && board.map((value, index) =>
              <Square
                onClick={onSquareClick}
                squareValue={value}
                squareIndex={index}
                key={index}>
              </Square>
            )}
          </div>
          {winner &&
            <div className="btn-play-again" onClick={() => clearBoard()}>Play again</div>
          }
        </div>
        <div>
          <table>
            <caption>{this.state.tableCaption}</caption>
            <tr>
              <th>Step</th>
              <th>Active Player</th>
              <th>Next Player</th>
              <th>Value</th>
            </tr>
            {this.renderTableData()}
          </table>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    board: state.board,
    winner: state.winner,
    actionLogs: state.actionLogs
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSquareClick: (squareIndex) => dispatch(setSquareValueAndChangeActivePlayer(squareIndex)),
    createBoard: () => dispatch(createBoard()),
    clearBoard: () => dispatch(clearBoard())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
