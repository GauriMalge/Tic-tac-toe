import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "../winning-combinations"
import GameOver from "./components/GameOver"

const iniialGameBoard = [
  [null,null,null ],
  [null,null,null ],
  [null,null,null ],
]

function derivedActivePlayer(gameTurns){
  let currentPlayer ='X'
  if(gameTurns.length>0 && gameTurns[0].player==='X'){currentPlayer='O'}
  return currentPlayer;
}



function App() {
  const[gameTurns,setGameTurns] = useState([])
  const[players,setPlayers] = useState({
    X: 'Player1',
    O: 'Player2',
  })

  const activePlayer = derivedActivePlayer(gameTurns)

  let gameBoard = [...iniialGameBoard.map((array) => [...array])]
  for(const turn of gameTurns){
  const{square,player} = turn
  const {row,col} = square
  gameBoard[row][col] = player
  }

let winner;
  for(const comnination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[comnination[0].row][comnination[0].column]
    const secondSquareSymbol = gameBoard[comnination[1].row][comnination[1].column]
    const thirdSquareSymbol = gameBoard[comnination[2].row][comnination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
     }

     const hasDraw = gameTurns.length === 9 && !winner

function handleRestart(){
  setGameTurns([])
}

  function handleSelectSquare(rowIndex,colIndex){
    
    setGameTurns(prevTurns=>{
      let currentPlayer =  derivedActivePlayer(prevTurns)
      const updatedTurns = [{square:{row:rowIndex , col:colIndex},player:currentPlayer},...prevTurns]
    return updatedTurns
    })
    
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(
      (prevPlayers) =>{
        return {...prevPlayers,[symbol]:newName}
      }
    )
    }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player initialName="Player 1"  symbol="X" isActive={activePlayer ==='X'} onChangeName={handlePlayerNameChange}/>
         <Player initialName="Player 2" symbol="O" isActive={activePlayer ==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
       {(winner || hasDraw) && <GameOver winner={winner} onRestart ={handleRestart}/>}
       <GameBoard 
       onSelectSquare={handleSelectSquare}
        board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
