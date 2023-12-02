import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Main.css";

import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

import GeneralKnowledge from "../images/general-knowledge.avif";
import Books from "../images/books.avif";
import Film from "../images/film.avif";
import Music from "../images/music.avif";
import MusicalTheatre from "../images/musical-theatre.jpg";
import Television from "../images/television.avif";
import VideoGames from "../images/videogame.jpg";
import BoardGames from "../images/boardgame.jpeg";
import ScienceNature from "../images/science-nature.jpeg";
import Computer from "../images/computer.jpeg";
import Mathematics from "../images/math.jpeg";
import Mythology from "../images/mythology.jpg";
import Sports from "../images/sport.webp";
import Geography from "../images/geography.jpeg";
import History from "../images/history.jpeg";
import Politics from "../images/politics.png";
import Art from "../images/art.jpeg";
import Celebrities from "../images/celebrities.jpeg";
import Animals from "../images/animals.jpeg";
import Vehicles from "../images/vehicle.jpeg";
import Comics from "../images/comic.jpeg";
import Gadgets from "../images/gadgets.png";
import Anime from "../images/manga-anime.jpeg";
import Cartoons from "../images/cartoon-animation.jpeg";

function Main({ sendDataToParent, sendDataToGameplay }) {
  // Create a user and get their guid]
  const createUser = () => {
    const existingGuid = sessionStorage.getItem("userGuid");

    if (existingGuid) {
      sendDataToGameplay(existingGuid);
    } else {
      axios
        .get(`http://localhost:8080/api/v1/user/register`)
        .then((response) => {
          const newGuid = response.data.id;
          sendDataToGameplay(newGuid);
          sessionStorage.setItem("userGuid", newGuid);
        })
        .catch((error) => {
          console.error(`Error creating a user:`, error);
        });
    }
  };

  const getUserScore = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/score/${sessionStorage.getItem(
          "userGuid"
        )}`
      )
      .then((response) => {
        const newUserScore = response.data.score;
        setScore(newUserScore);
      })
      .catch((error) => {
        console.error(`Error creating a user:`, error);
      });
  };

  useEffect(() => {
    createUser();
  }, []);

  const apiKey = "1NscCn7Jf3oBH8kb4Ew4BicIpRbY6KD0";
  const apiURL = "https://api.giphy.com/v1/gifs/search";
  const gifLimit = 30;
  const randomOffset = Math.floor(Math.random() * 100);

  const categoricalGif = async (categoryName) => {
    const params = {
      api_key: apiKey,
      q: categoryName,
      lang: "en",
      rating: "pg",
      sort: "relevance",
      limit: gifLimit,
      offset: randomOffset,
    };

    try {
      const response = await axios.get(apiURL, { params });
      const responseData = response.data.data;
      if (responseData.length > 0) {
        const randomIndex = Math.floor(Math.random() * responseData.length);
        return responseData[randomIndex].images.original.url;
      }
      // if gif isn't found
      return null;
    } catch (error) {
      console.error(`Error getching GIF for ${categoryName}: `, error);
      return null;
    }
  };

  // Initilaize the categories that the user will select from
  const category = {
    GeneralKnowledge: { image: GeneralKnowledge, id: 9 },
    Books: { image: Books, id: 10 },
    Film: { image: Film, id: 11 },
    Music: { image: Music, id: 12 },
    MusicalTheatre: { image: MusicalTheatre, id: 13 },
    Television: { image: Television, id: 14 },
    VideoGames: { image: VideoGames, id: 15 },
    BoardGames: { image: BoardGames, id: 16 },
    ScienceNature: { image: ScienceNature, id: 17 },
    Computer: { image: Computer, id: 18 },
    Math: { image: Mathematics, id: 19 },
    Mythology: { image: Mythology, id: 20 },
    Sports: { image: Sports, id: 21 },
    Geography: { image: Geography, id: 22 },
    History: { image: History, id: 23 },
    Politics: { image: Politics, id: 24 },
    Art: { image: Art, id: 25 },
    Celebrities: { image: Celebrities, id: 26 },
    Animals: { image: Animals, id: 27 },
    Vehicles: { image: Vehicles, id: 28 },
    Comics: { image: Comics, id: 29 },
    Gadgets: { image: Gadgets, id: 30 },
    Anime: { image: Anime, id: 31 },
    Cartoons: { image: Cartoons, id: 32 },
  };

  let [randomCategory, setRandomCategory] = useState([]);
  const [score, setScore] = useState(0);
  let numDisplay = 9;

  function randomizeCategory() {
    let keys = Object.keys(category); // Get all the keys in category
    // empty the random category beforehand
    setRandomCategory([]);

    // for the number of keys that will be displayed on screen (9)
    for (let i = 0; i < numDisplay; i++) {
      // create random index
      const randomIndex = Math.floor(Math.random() * keys.length);
      const randomKey = keys[randomIndex];

      categoricalGif(randomKey).then((gifUrl) => {
        setRandomCategory((prevRandomCategory) => [
          ...prevRandomCategory,
          { key: randomKey, gifUrl: gifUrl },
        ]);
      });
      // So that the same random index does not appear again
      keys.splice(randomIndex, 1);
    }
  }

  const getScore = (score) => {
    getUserScore(); // FIX: FIND WAY TO SEND SCORE AND GUID TO DIFFICULTY THEN TO GAMEPLAY
  };
  getScore();
  // send the data to difficulty.jsx
  function sendData(data) {
    sendDataToParent(data);
  }

  // randomize the categories initially
  useEffect(() => {
    randomizeCategory();
  }, []);

  return (
    <div className="main-page" data-testid="main-component">
      <header className="game-header">
        <div className="randomize-icon-container">
          <GiPerspectiveDiceSixFacesRandom
            className="randomize-icon"
            onClick={randomizeCategory}
          />
        </div>
        <div className="game-title-container">
          <span className="quiz">Quiz</span>
          <span className="quest">Quest!</span>
        </div>
        <div className="high-score-container">
          <p className="high-score">HighScore: {score}</p>
        </div>
        <div className="category-text-container">
          <p className="category-text">Pick a category!</p>
        </div>
      </header>
      <ul className="game-topic">
        {randomCategory.map((item, index) => {
          return (
            <li className="key-values" key={index}>
              <Link
                className="key-link"
                to="/difficulty"
                onClick={() => {
                  sendData(category[item.key].id);
                }}
              >
                <p className="name">{item.key}</p>
                <div className="image-container">
                  {item.gifUrl ? (
                    <img
                      className="topic"
                      src={item.gifUrl}
                      alt="Category Media"
                    />
                  ) : (
                    // Use the placeholder image when gifUrl is null
                    <img
                      className="topic"
                      src={category[item.key].image}
                      alt="Placeholder"
                    />
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Main;
