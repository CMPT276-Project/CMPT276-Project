import React, {useState, usesEffect} from 'react'
import BackIcon from "./icons/BackIcon"
import "../styles/Gameplay.css"

function Gameplay() {

  return (
    <div className="gameplay-page" data-testid="gameplay-component">
      <header className="gameplay-header">
        <BackIcon />
        <div className="question-container">
          <span className="question">
            Question
          </span>
        </div>
      </header>
      <div className="info-container">
        <div className="image-option">
          <div className="image"></div>
          <div className="option-container">
            <div className="option option-1">Option 1</div>
            <div className="option option-1">Option 2</div>
            <div className="option option-1">Option 3</div>
            <div className="option option-1">Option 4</div>
          </div>
        </div>
        <div className="timer-score">
          <div className="timer">Timer</div>
          <div className="score">Score</div>
        </div>
      </div>
    </div>
  )
}

export default Gameplay