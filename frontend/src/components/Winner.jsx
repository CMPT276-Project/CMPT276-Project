import React from 'react'
import "../styles/Winner.css"
import {useNavigate} from 'react-router-dom'

function Winner({ dataFromParent }) {

    const navigate = useNavigate()
  return (
    <div className="winner-page">
        <p className="status">You Win</p>
        <div className="score-board">Your Score: {dataFromParent} </div>
        <div className="play-again" onClick={() => navigate('/') }>Play Again</div>
    </div>
  )
}

export default Winner