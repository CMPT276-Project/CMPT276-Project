import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import BackIcon from "./icons/BackIcon"
import "../styles/Difficulty.css"

function Difficulty({ dataFromParent, sendDataToParent }) {

  // this is the url where we will send api call to
  const apiURL = "https://opentdb.com/api.php"

  async function dataDoorOne() {

    // parameter that will be passed with the api call
    const params = {
      "amount": 10,
      "category": dataFromParent,
      "difficulty": 'easy',
    }

    try {

      // get response from the api call
      const response = await axios.get(apiURL, { params })

      // if the response is obtained from the api call
      if (response.data.results) {

        // send the data from api call to Gameplay.jsx
        sendDataToParent(response.data.results)

      }

    // if there is an error from api call, show error
    } catch (error) {
      console.error("Error fetching response data: ", error)
    }
  }

  async function dataDoorTwo() {

    // parameter that will be passed with the api call
    const params = {
      "amount": 10,
      "category": dataFromParent,
      "difficulty": 'medium',
    }

    try {

      // get response from the api call
      const response = await axios.get(apiURL, { params })

      // if the response is obtained from the api call
      if (response.data.results) {

        // send the data from api call to Gameplay.jsx
        sendDataToParent(response.data.results)

      }
      
    // if there is an error from api call, show error
    } catch (error) {
      console.error("Error fetching response data: ", error)
    }
  }

  async function dataDoorThree() {

    // parameter that will be passed with the api call
    const params = {
      "amount": 10,
      "category": dataFromParent,
      "difficulty": 'hard',
    }

    try {

      // get response from the api call
      const response = await axios.get(apiURL, { params })

      // if the response is obtained from the api call
      if (response.data.results) {

        // send the data from api call to Gameplay.jsx
        sendDataToParent(response.data.results)

      }

    // if there is an error from api call, show error
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