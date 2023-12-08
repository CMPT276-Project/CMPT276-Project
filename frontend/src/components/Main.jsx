import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
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

  let test_createUser = false;
  let test_getUserScore = false;
  let test_categoricalGif = false;
  let test_randomizeCategory = false;
  let test_getScore = false;

  function testMain() {
  
    if (test_createUser) {
      console.log("Create User Success");
    } else {
      console.log("Create User Failure");
    }
  
    if (test_getUserScore) {
      console.log("Get User Score Success");
    } else {
      console.log("Get User Score Failure");
    }
  
    if (test_categoricalGif) {
      console.log("Categorical GIF Success");
    } else {
      console.log("Categorical GIF Failure");
    }
  
    if (test_randomizeCategory) {
      console.log("Randomize Category Success");
    } else {
      console.log("Randomize Category Failure");
    }
  
    if (test_getScore) {
      console.log("Get Score Success");
    } else {
      console.log("Get Score Failure");
    }
  
  }

  // Create a user and get their guid]
  const createUser = () => {
    const existingGuid = sessionStorage.getItem("userGuid");
    if (existingGuid) {
      sendDataToGameplay(existingGuid);
      test_createUser = true;
    } else {
      axios
        .get(`http://localhost:8080/api/v1/user/register`)
        .then((response) => {
          const newGuid = response.data.id;
          sendDataToGameplay(newGuid);
          sessionStorage.setItem("userGuid", newGuid);
        })
        .catch((error) => {
          // console.error("Error creating user: ", error);
        });
    }
  };

  const getUserScore = () => {
    test_getUserScore = true;
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
        // console.error("Error getting user score: ", error);
      });
  };

  useEffect(() => {
    createUser();
  }, []);

  const apiKey = "1NscCn7Jf3oBH8kb4Ew4BicIpRbY6KD0";
  const apiURL = "https://api.giphy.com/v1/gifs/search";
  const gifLimit = 10;
  const randomOffset = Math.floor(Math.random() * 100);

  const categoryConfig = {
    GeneralKnowledge: { q: "knowledge" },
    Books: { q: "reading" },
    Film: { q: "film" },
    Music: { q: "musica" },
    MusicalTheatre: { q: "theatre opera" },
    Television: { q: "television" },
    VideoGames: { q: "VideoGames" },
    BoardGames: { q: "chess" },
    ScienceNature: { q: "nature" },
    Computer: { q: "computer" },
    Math: { q: "math" },
    Mythology: { q: "mythology" },
    Sports: { q: "sports hype" },
    Geography: { q: "map" },
    History: { q: "historical" },
    Politics: { q: "politics" },
    Art: { q: "art" },
    Celebrities: { q: "hollywood" },
    Animals: { q: "funny animals" },
    Vehicles: { q: "vehicles" },
    Comics: { q: "comics" },
    Gadgets: { q: "Gadgets" },
    Anime: { q: "anime" },
    Cartoons: { q: "cartoon" },
  };

  const categoricalGif = async (categoryName) => {
    const categoryParam = categoryConfig[categoryName];

    const params = {
      api_key: apiKey,
      q: categoryParam.q,
      lang: "en",
      rating: "pg-13",
      sort: "relevance",
      limit: gifLimit,
      offset: randomOffset,
    };

    try {
      test_categoricalGif = true;
      const response = await axios.get(apiURL, { params });
      const responseData = response.data.data;
      const filteredData = responseData.filter(
        (gif) => !gif.rating || gif.rating.toLowerCase() !== "r"
      );

      if (filteredData.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        return filteredData[randomIndex].images.original.url;
      }
      // if gif isn't found
      return null;
    } catch (error) {
      // console.error(`Error getching GIF for ${categoryName}: `, error);
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
    test_randomizeCategory = true;
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
    test_getScore = true;
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

  useEffect(() => {
    testMain()
  }, [test_createUser, test_getUserScore, test_categoricalGif, test_randomizeCategory, test_getScore])

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
