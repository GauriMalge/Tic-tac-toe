import React, { useState } from 'react'

export default function Player({initialName,symbol,isActive,onChangeName}) {
    const[isEditing, setIsEditing] = useState(false)
    const[playerName, setPlayerName] = useState(initialName)
   
    const handleClick =()=>{
       setIsEditing((editing)=>!editing)
      if(isEditing) {onChangeName(symbol,playerName)}
    }
const handleChange=(event)=>{
setPlayerName(event.target.value)
}



   let editablePlayerName = <span className="palyer-name">{playerName}</span>
    if(isEditing){
        editablePlayerName =  (<input type="text" value={playerName} onChange={handleChange} />)
    }
  return (
  
     <li className={isActive ? 'active':undefined}>
           <span className="player">
            { editablePlayerName }
           
          
           <span className="player-symbol">{symbol}</span>
           </span>
           <button onClick={handleClick}>{isEditing?'Save':'Edit'}</button>
          </li>
         
  )
}
