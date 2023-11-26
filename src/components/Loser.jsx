import React from 'react'
import "../styles/Loser.css"
import {useNavigate} from 'react-router-dom'

function Loser({ dataFromParent }) {

    const navigate = useNavigate()
  return (
    <div className="loser-page">
        <p className="status">You Lose</p>
        <div className="score-board">Your Score: {dataFromParent} </div>
        <div className="play-again" onClick={() => navigate('/')}>Play Again</div>
    </div>
  )
}

export default Loser