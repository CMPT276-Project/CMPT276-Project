import React from 'react'
import {Link} from 'react-router-dom'
import BackIcon from "./icons/BackIcon"
import "../styles/Difficulty.css"


function Difficulty() {
  return (
    <div className="difficulty-page" data-testid="difficulty-component">
      <header className="difficulty-header">
        <BackIcon />
        <div className="difficulty-title-container">
          <span className="difficulty-title">
            Difficulty
          </span>
        </div>
      </header>
      <div className="difficulty-container">
        <Link to="/gameplay" className="difficulty easy">Easy</Link>
        <Link to="/gameplay" className="difficulty medium">Medium</Link>
        <Link to="/gameplay" className="difficulty hard">Hard</Link>
      </div>
    </div>
  )
}

export default Difficulty