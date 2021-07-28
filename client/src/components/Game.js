import React from 'react';
import {Board} from './Board';
import {StartScreen} from './StartScreen';
import {DiffScreen} from './DiffScreen';
import {calculateWinner, nextMove} from '../aux/aux';
import { fillWinningSquares } from '../aux/utils';
import {HumanChoose} from './HumanChoose';
import {JoinGame} from './JoinGame';
import {CreateGame} from './CreateGame';
import {GameScreen} from './GameScreen';
import io from 'socket.io-client';

class Game extends React.Component {
    constructor(props){
        super(props);
        const size = ( typeof this.props.boardSize === 'undefined') ? 3 : this.props.boardSize;
        const diff = ( typeof this.props.difficulty === 'undefined') ? 2: this.props.difficulty;
        this.state = {
            joined: null,
            isGameIDvalid: true,
            appState: "start", // "start", "human-choose-game", "human-join", "human-create", "human-game", "pc-choose-diff", "pc-game"
            boardSize: size,
            squares: Array( size * size ).fill( null ),
            winningSquares: Array( size * size ).fill( false ),
            xIsNext: true,
            difficulty: diff,
            gameID: null,
            mySymbol: null
        };

        this.socket = io('localhost:8000');
        this.socket.on('opponentEntered',()=>{
          this.setState({
            joined: true
          })
         })
        this.socket.on('created-game', (gameID) => {
          setTimeout(() => {
            this.setState({
            gameID: gameID
          });

        },
        1000)});
        this.socket.on('opponent-played',(index)=>{
          console.log('stefo gynaika')
          if (!this.isMyTurn()){
            console.log('stefo ton efage')
            this.handleClick(index)
            
          }
        })
        this.socket.on('play-game',(flag) => {
          if (flag){
      
            let mySymbol = this.state.appState == "human-create"? 'X':'O'
            this.socket.emit('joinedGame',true)
            this.setState({
              mySymbol: mySymbol,
              appState: "human-game"
            })
            
                       
          }
          else{
            this.setState({
              isGameIDvalid: false
            })
          }
        })
        
    }

    resetGame() {
        this.setState({
            squares: Array( this.state.boardSize * this.state.boardSize).fill( null ),
            winningSquares: Array( this.state.boardSize * this.state.boardSize).fill( false ),
            xIsNext: true,
        });
    }
    isMyTurn(){
      return ((this.state.xIsNext && this.state.mySymbol == 'X')||(!this.state.xIsNext && this.state.mySymbol == 'O'))
        
    }
    handleClick( index ) {
        console.log('inside')
        let boardSquares = this.state.squares;
        let winningSquares = this.state.winningSquares;

        if( calculateWinner( boardSquares )[0] || boardSquares[ index ] ) return;

        boardSquares[ index ] = this.state.xIsNext ? 'X' : 'O';
        console.log(boardSquares)
        console.log(index)
        if (this.isMyTurn()){
        this.socket.emit('move',index)
        }
        
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

    setStateProperty(prop, value){
      this.setState({
        [prop]: value
      });
    }
    setDiffProperty(diff){
        this.setState({
           appState: 'pc-game' ,
           difficulty: diff,
           mySymbol: 'X'
        });
      }

    handleJoinGame(gameID){
      this.socket.emit('join', (gameID))
      
    }
    

    handleCreateGame(){
      this.socket.emit('create-game', {});
      if (this.state.joined === null){
      this.setStateProperty('appState','human-create');
      }
      else{
        this.setStateProperty('appState','human-game')
      } 
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
            changeToMedium = {() => this.setDiffProperty(1)}
            changeToHard = {() => this.setDiffProperty(2)}
            />
            break;
        case "human-choose-game":
            return <HumanChoose
            createOnClick = {() => this.handleCreateGame()}
            joinOnClick = {() => this.setStateProperty('appState', 'human-join')}
            />
            break;
        case "human-join":
            return <JoinGame
              onSubmit = {(gameID) => this.handleJoinGame(gameID)}
              isGameIDvalid = {this.state.isGameIDvalid}
            />

            break;
        case "human-create":
          return <CreateGame
                    gameID = {this.state.gameID}
                 />
          break;
        case "pc-game":
            return <GameScreen
                      squares = {this.state.squares}
                      boardSize = {this.state.boardSize}
                      winningSquares = {this.state.winningSquares}
                      handleClick = {i => {if (this.isMyTurn()) {this.handleClick(i)}}}
                      opponent = 'pc'
                      
                   />
            break;
        case "human-game":
            return <GameScreen
                      squares = {this.state.squares}
                      boardSize = {this.state.boardSize}
                      winningSquares = {this.state.winningSquares}
                      handleClick = {i => {if (this.isMyTurn()) {this.handleClick(i)}}}
                      opponent = 'human'
                      
                  />
            break;
        default:
          break;
      }

    }

    render() {
       // if pc-game & 'o' is next, make move and setState
       if(this.state.appState == 'pc-game' && !this.state.xIsNext) {
         const pcMove = nextMove( 'O', this.state.difficulty, this.state.squares );
         setTimeout(() => this.handleClick(pcMove), 1000);
       }
       if (calculateWinner(this.state.squares)[0]){
         setTimeout(()=>this.resetGame(), 5000)
       }
       return this.selectGameScreen();
    }
}


export default Game;
