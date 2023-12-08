import React, { useState, useEffect } from "react";
import "../styles/Winner.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Winner({ dataFromParent }) {

  let test_fetchGIF = false;
  let test_response = false;

  function testWinner() {

    if (test_fetchGIF) {
      console.log("Fetch GIF Success");
    } else {
      console.log("Fetch GIF Failure");
    }

    if (test_response) {
      console.log("Response Success");
    } else {
      console.log("Response Failure");
    }
  }

  const navigate = useNavigate();

  const [gif, setGif] = useState("");
  const [renderedImage, setRenderedImage] = useState(null);

  const apiKey = "1NscCn7Jf3oBH8kb4Ew4BicIpRbY6KD0";
  const apiURL = "https://api.giphy.com/v1/gifs/search";
  const params = {
    api_key: apiKey,
    q: "win",
    rating: "pg",
    sort: "relevance",
    limit: 10,
  };

  const shuffleArray = (array) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray;
  };

  async function fetchGIF() {
    try {
      // get response from  the api call
      const response = await axios.get(apiURL, { params });
      if (response) {
        test_response = true;
        test_fetchGIF = true;
        testWinner()
      }

      // get response data (in array format) from the api call
      const responseData = response.data.data;

      // randomize the response data
      const newResponseData = shuffleArray(responseData);

      // set the gif of the response data
      setGif(newResponseData[1].images.original.url);

      // if there is an error when fetching api call, display the error
    } catch (error) {
      console.error("Error fetching response data: ", error);
    }
  }

  // fetch the gif when the score is received from Gameplay.jsx
  useEffect(() => {
    fetchGIF();
  }, [dataFromParent]);

  // render the image when the gif is set
  useEffect(() => {
    setRenderedImage(
      <img className="winner-image" src={gif} alt="You Lost ;(" />
    );
  }, [gif]);

  return (
    <div className="winner-page">
      <p className="status">You Win</p>
      {renderedImage}
      <div className="score-board">Your Score: {dataFromParent} </div>
      <div className="play-again" onClick={() => navigate("/trivia-game")}>
        Play Again
      </div>
    </div>
  );
}

export default Winner;
