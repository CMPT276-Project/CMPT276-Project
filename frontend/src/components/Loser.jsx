import React, { useState, useEffect } from "react";
import "../styles/Loser.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Loser({ dataFromParent }) {
  const navigate = useNavigate();

  const [gif, setGif] = useState("");
  const [renderedImage, setRenderedImage] = useState(null);

  const apiKey = "1NscCn7Jf3oBH8kb4Ew4BicIpRbY6KD0";
  const apiURL = "https://api.giphy.com/v1/gifs/search";
  const params = {
    api_key: apiKey,
    q: "lose",
    rating: "pg-13",
    limit: 50,
  };

  const shuffleArray = (array) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray;
  };

  async function fetchGIF() {
    try {
      // get response from api call
      const response = await axios.get(apiURL, { params });

      // get response data (in array format) from the api call
      const responseData = response.data.data;

      // randomize the response data
      const newResponseData = shuffleArray(responseData);

      // set the gif of the response data
      setGif(newResponseData[1].images.original.url);

      // if there is an error while fetching api call, display api call
    } catch (error) {
      console.error("Error fetching response data: ", error);
    }
  }

  // when the score is received from Gameplay.jsx, fetch the gif
  useEffect(() => {
    fetchGIF();
  }, [dataFromParent]);

  // when the gif is set, render the gif
  useEffect(() => {
    setRenderedImage(<img className="loser-image" src={gif} />);
  }, [gif]);

  return (
    <div className="loser-page">
      <p className="status">You Lose</p>
      {renderedImage}
      <div className="score-board">Your Score: {dataFromParent} </div>
      <div className="play-again" onClick={() => navigate("/")}>
        Play Again
      </div>
    </div>
  );
}

export default Loser;
