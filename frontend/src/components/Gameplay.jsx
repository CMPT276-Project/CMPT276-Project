import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackIcon from "./icons/BackIcon";
import "../styles/Gameplay.css";

function Gameplay({ dataFromParent, sendDataToParent, guidFromParent }) {
  const navigate = useNavigate();
  const [numQuestions, setNumQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [renderedContent, setRenderedContent] = useState(null);
  const [renderedTime, setRenderedTime] = useState(null);
  const [type, setType] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answerOptions, setAnswerOptions] = useState([]);
  const [newAnswerOptions, setNewAnswerOptions] = useState([]);
  const [seconds, setSeconds] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const [isCorrect, setIsCorrect] = useState(null);
  const [gif, setGif] = useState("");

  const apiKey = "1NscCn7Jf3oBH8kb4Ew4BicIpRbY6KD0";
  const apiURL = "https://api.giphy.com/v1/gifs/search";
  const gifLimit = 10;
  const randomOffset = Math.floor(Math.random() * 100);

  const categoryConfig = {
    1: { q: "smart" },
    2: { q: "cheer" },
    3: { q: "happy pokemon" },
    4: { q: "lets go" },
    5: { q: "encourage" },
    6: { q: "happy anime" },
  };

  const getRandomCategoryKey = () => {
    const keys = Object.keys(categoryConfig);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };

  const categoricalGif = async (categoryName) => {
    const categoryParam = categoryConfig[getRandomCategoryKey()];

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

  function handleAnswerClick(answer) {
    setSelectedAnswer(answer);
  }

  const shuffleArray = (array) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray;
  };

  useEffect(() => {
    console.log("guidFromParent: ", guidFromParent);
  }, [guidFromParent]);

  // Check if the user got answer right
  useEffect(() => {
    // if the user selected an answer
    if (selectedAnswer !== null) {
      // if the user answered correctly
      if (selectedAnswer === correctAnswer[currentQuestionIndex]) {
        // calculate the score based on how fast the user answered
        const timeTaken = 60 - seconds;
        const scoreToAdd = Math.max(0, 100 - timeTaken);
        setIsCorrect(true);
        categoricalGif().then((url) => {
          setGif(url);
        });
        // add the score
        setScore(score + scoreToAdd);

        // move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);

        // reset selected answer
        setSelectedAnswer(null);

        // reset time
        setSeconds(60);

        // if the user answers all questions correctly
        if (currentQuestionIndex + 1 === numQuestions) {
          // send the user to the winner page
          navigate("/winner");

          sendDataToParent(score);

          axios
            .patch(`http://localhost:8080/api/v1/score/${guidFromParent}`, {
              score: score,
            })
            .then((response) => {
              if (response.data.updated) {
                console.log("posted highscore!");
              }
            })
            .catch((error) => {
              console.error(`Error updating user score:`, error);
            });
          // send post request to backend here
        }
        // if the user answers the question incorrectly
      } else {
        setIsCorrect(false);
        // send data to Loser.jsx
        sendDataToParent(score);

        //POST => UPDATES SCORE
        axios
          .patch(`http://localhost:8080/api/v1/score/${guidFromParent}`, {
            score: score,
          })
          .then((response) => {
            if (response.data.updated) {
              console.log("posted highscore!");
            }
          })
          .catch((error) => {
            console.error(`Error updating user score:`, error);
          });

        navigate("/loser", {
          state: { correctAnswer: correctAnswer[currentQuestionIndex] },
        });
      }
    } else {
      console.log("selected answer is null");
    } // eslint-disable-next-line
  }, [selectedAnswer, numQuestions]);

  // this is where everything shown on screen is intialized
  // eg. questions, answer options, timer and score
  useEffect(() => {
    let updateType = [];
    let updateAnswers = [];
    let updateQuestions = [];
    let updateCorrectAnswer = [];

    // organize the questions into one array
    // organize the correct answer and incorrect answer into one pool of answers
    for (let i = 0; i < dataFromParent.length; i++) {
      const temp = [];

      // push the type of the question from the api call
      updateType.push(dataFromParent[i].type);

      // remove any characters from the question from the api call
      dataFromParent[i].question = dataFromParent[i].question
        .replace(/(&quot;)/g, '"')
        .replace(/(&rsquo;)/g, '"')
        .replace(/(&#039;)/g, "'")
        .replace(/(&amp;)/g, '"');

      // push the question
      updateQuestions.push(dataFromParent[i].question);

      // push correct answer
      updateCorrectAnswer.push(dataFromParent[i].correct_answer);

      // push correct and incorrect answer onto answer option array
      temp.push(dataFromParent[i].correct_answer);
      dataFromParent[i].incorrect_answers.forEach((item) => {
        temp.push(item);
      });
      // randomize the answer option
      const newTemp = shuffleArray(temp);
      updateAnswers.push(newTemp);
    }

    // push all the arrays into corresponding state arrays
    setNumQuestions(dataFromParent.length);
    setCorrectAnswer(updateCorrectAnswer);
    setAnswerOptions(updateAnswers);
    setQuestions(updateQuestions);
    setType(updateType);
  }, [dataFromParent]);

  //
  useEffect(() => {
    setNewAnswerOptions([]);
    if (answerOptions) {
      setNewAnswerOptions(answerOptions[currentQuestionIndex]);

      // update and print the time in real-time
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      // if the time is up, reset the interval
      if (seconds === -1) {
        console.log("time is up");
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    } // eslint-disable-next-line
  }, [answerOptions, currentQuestionIndex]);

  useEffect(() => {
    // display the time that updates in real-time while the user is answering
    if (seconds >= 0) {
      setRenderedTime(<div className="timer">{seconds}</div>);
    } else {
      setRenderedTime(<div className="timer">"Time is up!"</div>);

      // if the user doesn't answer the question on time
      navigate("/loser", {
        state: { correctAnswer: correctAnswer[currentQuestionIndex] },
      });
    } // eslint-disable-next-line
  }, [seconds]);

  useEffect(() => {
    const answerBuffer = [];
    if (newAnswerOptions) {
      newAnswerOptions.forEach((item, index) => {
        item = item
          .replace(/(&quot;)/g, '"')
          .replace(/(&rsquo;)/g, "'")
          .replace(/(&#039;)/g, "'")
          .replace(/(&amp;)/g, "&");
        answerBuffer.push(
          <div
            className="option"
            key={index}
            onClick={() => handleAnswerClick(item)}
          >
            {item}
          </div>
        );
      });

      setRenderedContent(answerBuffer);
    }
  }, [newAnswerOptions]);

  return (
    <div className="gameplay-page" data-testid="gameplay-component">
      <header className="gameplay-header">
        <BackIcon />
        <div className="question-container">
          <span className="question">Question #{currentQuestionIndex + 1}</span>
        </div>
      </header>
      <div className="info-container">
        <div className="image-option">
          <div className="image">{questions[currentQuestionIndex]}</div>
          {type[currentQuestionIndex] === "multiple" ? (
            <div className="multiple-option-container">{renderedContent}</div>
          ) : (
            <div className="boolean-option-container">{renderedContent}</div>
          )}
        </div>
        <div className="timer-score-gif-container">
          {renderedTime}
          <div className="score">Score: {score}</div>
          {/* Display the GIF if the answer is correct */}
          {isCorrect && gif && (
            <div className="correct-answer-gif-container">
              <img
                className="correct-answer-gif"
                src={gif}
                alt="Correct Answer GIF"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gameplay;
