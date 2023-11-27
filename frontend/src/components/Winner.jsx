import React, {useState, useEffect} from 'react'
import "../styles/Winner.css"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Winner({ dataFromParent }) {

  const navigate = useNavigate()

  const [gif, setGif] = useState("")
  const [renderedImage, setRenderedImage] = useState(null)

  const apiKey = "1NscCn7Jf3oBH8kb4Ew4BicIpRbY6KD0"
  const apiURL = "https://api.giphy.com/v1/gifs/search"
  const params = {
    'api_key': apiKey,
    'q': 'win',
    'rating': 'pg-13',
    'limit': 50
  }

  const shuffleArray = (array) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5)
    return shuffledArray
  }

  async function fetchGIF() {
    try {
      const response = await axios.get(apiURL, {params})
      const responseData = response.data.data // array
      const newResponseData = shuffleArray(responseData) // randomize responseData array
      setGif(newResponseData[1].images.original.url)
    } catch (error) {
      console.error("Error fetching response data: ", error)
    }
  }

  useEffect(() => {
    fetchGIF()
  }, [dataFromParent])

  useEffect(() => {
    setRenderedImage(
      <img className="winner-image" src={gif} />
    )
  }, [gif])

  return (
    <div className="winner-page">
        <p className="status">You Win</p>
        {renderedImage}
        <div className="score-board">Your Score: {dataFromParent} </div>
        <div className="play-again" onClick={() => navigate('/') }>Play Again</div>
    </div>
  )
}

export default Winner