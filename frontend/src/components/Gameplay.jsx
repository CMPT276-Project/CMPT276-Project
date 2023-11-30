import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackIcon from "./icons/BackIcon"
import "../styles/Gameplay.css"

function Gameplay({ dataFromParent, sendDataToParent }) {

  const navigate = useNavigate()
  const [numQuestions, setNumQuestions] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [renderedContent, setRenderedContent] = useState(null)
  const [renderedTime, setRenderedTime] = useState(null)
  const [type, setType] = useState([])
  const [questions, setQuestions] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [answerOptions, setAnswerOptions] = useState([])
  const [newAnswerOptions, setNewAnswerOptions] = useState([])
  const [seconds, setSeconds] = useState(60)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)

  function handleAnswerClick(answer) {
    setSelectedAnswer(answer)
  }

  const shuffleArray = (array) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5)
    return shuffledArray
  }

  // Check if the user got answer right
  useEffect(() => {

    // if the user selected an answer
    if (selectedAnswer !== null) {

      // if the user answered correctly
      if (selectedAnswer === correctAnswer[currentQuestionIndex]) {
        
        // calculate the score based on how fast the user answered
        const timeTaken = 60 - seconds
        const scoreToAdd = Math.max(0, 100 - timeTaken)

        // add the score
        setScore(score + scoreToAdd)

        // move to next question
        setCurrentQuestionIndex( currentQuestionIndex + 1 )

        // reset selected answer
        setSelectedAnswer(null)

        // reset time
        setSeconds(60)

        // if the user answers all questions correctly
        if (currentQuestionIndex + 1 === numQuestions) {

          // send the user to the winner page
          navigate('/winner')

          // send post request to backend here
          
        }
      
      // if the user answers the question incorrectly
      } else {

        // send data to Loser.jsx
        sendDataToParent(score)

        // send post request to backend here

        // send the user to the loser page
        navigate('/loser')

      }

    } else {
      console.log('selected answer is null')

    }

  }, [selectedAnswer, numQuestions])

  // this is where everything shown on screen is intialized
  // eg. questions, answer options, timer and score
  useEffect(() => {

    let updateType = []
    let updateAnswers = []
    let updateQuestions = []
    let updateCorrectAnswer = []

    // organize the questions into one array
    // organize the correct answer and incorrect answer into one pool of answers
    for (let i = 0; i < dataFromParent.length; i++) {

      const temp = []

      // push the type of the question from the api call
      updateType.push(dataFromParent[i].type)

      // remove any characters from the question from the api call
      dataFromParent[i].question = dataFromParent[i].question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"")

      // push the question 
      updateQuestions.push(dataFromParent[i].question)

      // push correct answer
      updateCorrectAnswer.push(dataFromParent[i].correct_answer)

      // push correct and incorrect answer onto answer option array
      temp.push(dataFromParent[i].correct_answer)
      dataFromParent[i].incorrect_answers.forEach(item => {
        temp.push(item)
      })
      // randomize the answer option
      const newTemp = shuffleArray(temp)
      updateAnswers.push(newTemp)

    }

    // push all the arrays into corresponding state arrays
    setNumQuestions(dataFromParent.length)
    setCorrectAnswer(updateCorrectAnswer)
    setAnswerOptions(updateAnswers)
    setQuestions(updateQuestions)
    setType(updateType)
  
  }, [dataFromParent])

  //
  useEffect(() => {

    setNewAnswerOptions([])
    if (answerOptions) {
      setNewAnswerOptions(answerOptions[currentQuestionIndex])
      
      // update and print the time in real-time
      const timer = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 1000)

      // if the time is up, reset the interval
      if (seconds === -1) {
        console.log('time is up')
        clearInterval(timer)
      }

      return () => clearInterval(timer)

    } 
    
  }, [answerOptions, currentQuestionIndex])

  useEffect(() => {

    // display the time that updates in real-time while the user is answering
    if (seconds >= 0) {
      setRenderedTime(
        <div className="timer">
          {seconds}
        </div>
      )

    } else {
      setRenderedTime(
        <div className="timer">
          "Time is up!"
        </div>
      )

      // if the user doesn't answer the question on time
      navigate('/loser')
    }
  }, [seconds])

  useEffect(() => {
    const answerBuffer = []
    if (newAnswerOptions) {
      newAnswerOptions.forEach((item, index) => {
        item = item.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"")
        answerBuffer.push(
          <div className="option" key={index} onClick={() => handleAnswerClick(item)}>
            {item}
          </div>
        )
      })

      setRenderedContent(answerBuffer)
    }
  }, [newAnswerOptions])

  return (
    <div className="gameplay-page" data-testid="gameplay-component">
      <header className="gameplay-header">
        <BackIcon />
        <div className="question-container">
          <span className="question">
            Question #{currentQuestionIndex + 1}
          </span>
        </div>
      </header>
      <div className="info-container">
        <div className="image-option">
          <div className="image">
            {questions[currentQuestionIndex]}
          </div>
            {type[currentQuestionIndex] === 'multiple' ? (
              <div className="multiple-option-container">
                {renderedContent}
              </div>
            ) : (
              <div className="boolean-option-container">
                {renderedContent}
              </div>
            )}
        </div>
        <div className="timer-score">
          {renderedTime}
          <div className="score">
            {score}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gameplay