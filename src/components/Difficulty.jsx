import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import BackIcon from "./icons/BackIcon"
import "../styles/Difficulty.css"

// There will be 4 doors, difficulty of each door will be random
// input: key.id

// amount is set, type is random, difficulty is random

/* 

const params = {
  amount,
  category,
  difficulty,
  type
}

*/

function Difficulty({ dataFromParent, sendDataToParent }) {

  const [triviaData, setTriviaData] = useState([])

  const apiURL = "https://opentdb.com/api.php"
  const amount = 10
  // const difficultyList = ['easy', 'medium', 'hard']
  const typeList = ['mutiple', 'boolean']

  const shuffleArray = (array) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5)
    return shuffledArray
  }
  async function dataDoorOne() {

    const params = {
      "amount": 10,
      "category": dataFromParent,
      "difficulty": 'easy',
    }

    try {
      const response = await axios.get(apiURL, { params })
      console.log(response.data.results)
      if (response.data.results) {
        sendDataToParent(response.data.results)
      }
    } catch (error) {
      console.error("Error fetching response data: ", error)
    }
  }

  async function dataDoorTwo() {

    const params = {
      "amount": 10,
      "category": dataFromParent,
      "difficulty": 'medium',
    }

    try {
      const response = await axios.get(apiURL, { params })
      if (response.data.results) {
        sendDataToParent(response.data.results)
      }
    } catch (error) {
      console.error("Error fetching response data: ", error)
    }
  }

  async function dataDoorThree() {

    const params = {
      "amount": 10,
      "category": dataFromParent,
      "difficulty": 'hard',
    }

    try {
      const response = await axios.get(apiURL, { params })
      if (response.data.results) {
        sendDataToParent(response.data.results)
      }
    } catch (error) {
      console.error("Error fetching response data: ", error)
    }
  }

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
        <Link to="/gameplay" className="door door-1" onClick={dataDoorOne}>Easy</Link>
        <Link to="/gameplay" className="door door-2" onClick={dataDoorTwo}>Medium</Link>
        <Link to="/gameplay" className="door door-3" onClick={dataDoorThree}>Hard</Link>
      </div>
    </div>
  )
}

export default Difficulty