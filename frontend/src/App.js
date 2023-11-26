import React, {useState, useEffect} from "react"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main'
import Difficulty from './components/Difficulty'
import Gameplay from './components/Gameplay'
import Loser from "./components/Loser"
import Winner from "./components/Winner"

function App() {

  const [mainData, setMainData] = useState("")
  const [difficultyData, setDifficultyData] = useState([])
  const [officialScore, setOfficialScore] = useState(0)

  const handleMainDataReceive = (data) => {
    setMainData(data)
  }

  const handleDifficultyDataReceive = (data) => {
    setDifficultyData(data)
  }

  const handleLoserWinnerDataReceive = (data) => {
    setOfficialScore(data)
  }

  useEffect(() => {
    console.log('mainData: ', mainData)
  }, [mainData])

  useEffect(() => {
    console.log('mainData: ', difficultyData)
  }, [difficultyData])

  useEffect(() => {
    console.log('mainData: ', officialScore)
  }, [officialScore])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main sendDataToParent={handleMainDataReceive} />} />
        <Route path="/difficulty" element={<Difficulty dataFromParent={mainData} sendDataToParent={handleDifficultyDataReceive} />} />
        <Route path="/gameplay" element={<Gameplay dataFromParent={difficultyData} sendDataToParent={handleLoserWinnerDataReceive} />} />
        <Route path="/loser" element={<Loser dataFromParent={officialScore} />} />
        <Route path="/winner" element={<Winner dataFromParent={officialScore} />} />
      </Routes>
    </Router>
  );
}

export default App;
