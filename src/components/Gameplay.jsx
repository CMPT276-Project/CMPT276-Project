import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackIcon from "./icons/BackIcon"
import "../styles/Gameplay.css"

function Gameplay({ dataFromParent, sendDataToParent }) {

  const navigate = useNavigate()

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
  

    if (selectedAnswer !== null) {

      // If the user answers all the questions correctly, they win
      if (currentQuestionIndex === dataFromParent.length) {
        navigate('/winner')
      }

      if (selectedAnswer === correctAnswer[currentQuestionIndex]) {
        
        const timeTaken = 60 - seconds
        const scoreToAdd = Math.max(0, 100 - timeTaken)

        setScore(score + scoreToAdd)

        // move to next question
        setCurrentQuestionIndex( currentQuestionIndex + 1 )
        setSelectedAnswer(null)
        setSeconds(60)

      } else {
        // data to parent
        sendDataToParent(score)
        navigate('/loser')
      }
    } else {
      console.log('selected answer is null')
    }
  }, [selectedAnswer])

  useEffect(() => {

    let updateType = []
    let updateAnswers = []
    let updateQuestions = []
    let updateCorrectAnswer = []

    // organize the questions into one array
    // organize the correct answer and incorrect answer into one pool of answers
    for (let i = 0; i < dataFromParent.length; i++) {

      const temp = []

      // push types
      updateType.push(dataFromParent[i].type)

      // remove any characters from the question
      dataFromParent[i].question = dataFromParent[i].question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"")
      updateQuestions.push(dataFromParent[i].question)

      // push correct answer
      updateCorrectAnswer.push(dataFromParent[i].correct_answer)

      // push correct answer onto temp
      temp.push(dataFromParent[i].correct_answer)

      // push incorrect answers
      dataFromParent[i].incorrect_answers.forEach(item => {
        temp.push(item)
      })

      const newTemp = shuffleArray(temp)

      // push the temp array into the answer options array
      updateAnswers.push(newTemp)
    }

    setCorrectAnswer(updateCorrectAnswer)
    setAnswerOptions(updateAnswers)
    setQuestions(updateQuestions)
    setType(updateType)
  
  }, [dataFromParent])

  useEffect(() => {
    setNewAnswerOptions([])
    if (answerOptions) {
      setNewAnswerOptions(answerOptions[currentQuestionIndex])
      
      // set timer and print the timer
      const timer = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 1000)

      if (seconds === -1) {
        console.log('time is up')
        clearInterval(timer)
      }

      return () => clearInterval(timer)

    } 
  }, [answerOptions, currentQuestionIndex])

  useEffect(() => {
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