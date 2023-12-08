import React, {useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BackIcon from "./icons/BackIcon";
import "../styles/Difficulty.css";

function Difficulty({ dataFromParent, sendDataToParent }) {

  let test_response = false;
  let test_dataDoorOne = false;
  let test_dataDoorTwo = false;
  let test_dataDoorThree = false;

  let chosen_door = 0;

  function testDifficulty() {

    if (chosen_door === 1) {
      if (test_dataDoorOne) {
        console.log("Data Door One Success");
      } else {
        console.log("Data Door One Failure");
      }

      if (test_response) {
        console.log("Response Success");
      } else {
        console.log("Response Failure");
      }

    }

    if (chosen_door === 2) {

      if (test_dataDoorTwo) {
        console.log("Data Door Two Success");
      } else {
        console.log("Data Door Two Failure");
      }

      if (test_response) {
        console.log("Response Success");
      } else {
        console.log("Response Failure");
      }
    }

    if (chosen_door === 3) {
      
      if (test_dataDoorThree) {
        console.log("Data Door Three Success");
      } else {
        console.log("Data Door Three Failure");
      }

      if (test_response) {
        console.log("Response Success");
      } else {
        console.log("Response Failure");
      }
    }
  }

  // this is the url where we will send api call to
  const apiURL = "https://opentdb.com/api.php";

  async function dataDoorOne() {
    chosen_door = 1;
    test_dataDoorOne = true;
    // parameter that will be passed with the api call
    const params = {
      amount: 10,
      category: dataFromParent,
      difficulty: "easy",
    };

    try {
      // get response from the api call
      const response = await axios.get(apiURL, { params });
      // if the response is obtained from the api call
      if (response.data.results) {
        test_response = true;
        test_dataDoorOne = true;
        testDifficulty()
        // send the data from api call to Gameplay.jsx
        sendDataToParent(response.data.results);
      }

      // if there is an error from api call, show error
    } catch (error) {
      console.error("Error fetching response data: ", error);
    }
  }

  async function dataDoorTwo() {
    chosen_door = 2;
    test_dataDoorTwo = true;
    // parameter that will be passed with the api call
    const params = {
      amount: 10,
      category: dataFromParent,
      difficulty: "medium",
    };

    try {
      // get response from the api call
      const response = await axios.get(apiURL, { params });

      // if the response is obtained from the api call
      if (response.data.results) {
        test_response = true;
        test_dataDoorTwo = true;
        testDifficulty()
        // send the data from api call to Gameplay.jsx
        sendDataToParent(response.data.results);
      }

      // if there is an error from api call, show error
    } catch (error) {
      console.error("Error fetching response data: ", error);
    }
  }

  async function dataDoorThree() {
    chosen_door = 3;
    test_dataDoorThree = true;
    // parameter that will be passed with the api call
    const params = {
      amount: 10,
      category: dataFromParent,
      difficulty: "hard",
    };

    try {
      // get response from the api call
      const response = await axios.get(apiURL, { params });

      // if the response is obtained from the api call
      if (response.data.results) {
        test_response = true;
        test_dataDoorThree = true;
        testDifficulty()
        // send the data from api call to Gameplay.jsx
        sendDataToParent(response.data.results);
      }

      // if there is an error from api call, show error
    } catch (error) {
      console.error("Error fetching response data: ", error);
    }
  }

  useEffect(() => {
    testDifficulty();
  }, [test_dataDoorOne, test_dataDoorTwo, test_dataDoorThree, test_response])

  return (
    <div className="difficulty-page" data-testid="difficulty-component">
      <header className="difficulty-header">
        <BackIcon />
        <div className="difficulty-title-container">
          <span className="difficulty-title">Difficulty</span>
        </div>
      </header>
      <div className="difficulty-container">
        <Link to="/gameplay" className="door door-1" onClick={dataDoorOne}>
          Easy
        </Link>
        <Link to="/gameplay" className="door door-2" onClick={dataDoorTwo}>
          Medium
        </Link>
        <Link to="/gameplay" className="door door-3" onClick={dataDoorThree}>
          Hard
        </Link>
      </div>
    </div>
  );
}

export default Difficulty;
