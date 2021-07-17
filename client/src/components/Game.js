import React from 'react';
import {Board} from './Board';
import {StartScreen} from './StartScreen';
import {DiffScreen} from './DiffScreen';
import {calculateWinner} from '../aux/aux';
import { fillWinningSquares } from '../aux/utils';
import {HumanChoose} from './HumanChoose';
import {JoinGame} from './JoinGame';
import {CreateGame} from './CreateGame';
import {HumanGame} from './HumanGame';

import PcGame from './PcGame.js';

class Game extends React.Component {
    constructor(props){
        super(props);
        const size = ( typeof this.props.boardSize === 'undefined') ? 3 : this.props.boardSize;
        const diff = ( typeof this.props.difficulty === 'undefined') ? 2: this.props.difficulty;
        this.state = {
            appState: "start", // "start", "human-choose-game", "human-join", "human-create", "human-game", "pc-choose-diff", "pc-game"
            boardSize: size,
            squares: Array( size * size ).fill( null ),
            winningSquares: Array( size * size ).fill( false ),
            xIsNext: true,
            difficulty: diff,
        };
    }
    resetGame() {
        this.setState({
            squares: Array( this.state.boardSize * this.state.boardSize).fill( null ),
            winningSquares: Array( this.state.boardSize * this.state.boardSize).fill( false ),
            xIsNext: true,
        });
    }
    handleClick( index ) {
        let boardSquares = this.state.squares;
        let winningSquares = this.state.winningSquares;

        if( calculateWinner( boardSquares )[0] || boardSquares[ index ] ) return;

        boardSquares[ index ] = this.state.xIsNext ? 'X' : 'O';

        if (calculateWinner(boardSquares)[0]){
            let winningLine = calculateWinner(boardSquares)[1];
            winningSquares = fillWinningSquares(winningSquares, winningLine[0], winningLine[1], winningLine[2]);

        }


        this.setState({
            squares: boardSquares,
            xIsNext: !this.state.xIsNext,
            winningSquares: winningSquares,
        });
    }
    renderButton(){
        return(
                    <div><button onClick = {() => this.resetGame()}>Reset</button></div>
        );
    }
    renderEasyButton(){
        return(
            <button onClick = {()=>this.changeToEasy()}>Easy</button>
        );
    }
    renderMediumButton(){
        return(
             <button onClick = {()=>this.changeToMedium()}>Medium</button>
        );
    }
    renderHardButton(){
        return(
             <button onClick = {()=>this.changeToHard()}>Hard</button>
        );
    }
    changeToEasy(){
        this.setState({
            difficulty: 0,
        });
    }
    changeToMedium(){
        this.setState({
            difficulty: 1,
        });
    }
    changeToHard(){
        this.setState({
            difficulty: 2,
        });
    }

    setStateProperty(prop, value){
      this.setState({
        [prop]: value
      });
    }
    setDiffProperty(diff){
        this.setState({
           appState: 'pc-game' ,
           difficulty: diff
        });
      }
  

    selectGameScreen(){
      console.log(this.state);
      const appState = this.state.appState
      switch (appState) {
        case "start":
           return <StartScreen
                    humanOnClick = {() => this.setStateProperty('appState', 'human-choose-game')}
                    botOnClick = {() => this.setStateProperty('appState', 'pc-choose-diff')}
                  />
           break;
        case "pc-choose-diff":
            return <DiffScreen
            changeToEasy = {() => this.setDiffProperty(0)}
            changeToMedium = {() => this.setStateProperty(1)}
            changeToHard = {() => this.setStateProperty(2)}
            />
            break;
        case "human-choose-game":
            return <HumanChoose
            createOnClick = {() => this.setStateProperty('appState','human-create')}
            joinOnClick = {() => this.setStateProperty('appState', 'human-join')}
            />
            break;
        case "human-join":
            return <JoinGame
            joinGameOnClick = {() => this.setStateProperty('appState', 'human-game')}
            />
            break;
        case "pc-game":
            return <PcGame/>
            break;
           // case "...":
        //    <.../>

        default:
          return <div className="game">
            <div className="game-board">
              <Board
                squares = {this.state.squares}
                boardSize = {this.state.boardSize}
                winningSquares = {this.state.winningSquares}
                onClick={i => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{this.renderButton()}</div>
              <div>{this.renderEasyButton()}</div>
              <div>{this.renderMediumButton()}</div>
              <div>{this.renderHardButton()}</div>
            </div>
          </div>
      }

    }

    render() {
       return this.selectGameScreen();
    }
}


export default Game;
