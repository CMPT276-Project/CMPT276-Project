import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "../styles/Main.css"

import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

import GeneralKnowledge from '../images/general-knowledge.avif'
import Books from '../images/books.avif'
import Film from '../images/film.avif'
import Music from '../images/music.avif'
import MusicalTheatre from '../images/musical-theatre.jpg'
import Television from '../images/television.avif'
import VideoGames from '../images/videogame.jpg'
import BoardGames from '../images/boardgame.jpeg'
import ScienceNature from '../images/science-nature.jpeg'
import Computer from '../images/computer.jpeg'
import Mathematics from '../images/math.jpeg'
import Mythology from '../images/mythology.jpg'
import Sports from '../images/sport.webp'
import Geography from '../images/geography.jpeg'
import History from '../images/history.jpeg'
import Politics from '../images/politics.png'
import Art from '../images/art.jpeg'
import Celebrities from '../images/celebrities.jpeg'
import Animals from '../images/animals.jpeg'
import Vehicles from '../images/vehicle.jpeg'
import Comics from '../images/comic.jpeg'
import Gadgets from '../images/gadgets.png'
import Anime from '../images/manga-anime.jpeg'
import Cartoons from '../images/cartoon-animation.jpeg'

function Main({ sendDataToParent }) {

    // Initilaize the categories that the user will select from
    const category = {
        GeneralKnowledge: {image: GeneralKnowledge, id: 9},
        Books: {image: Books, id: 10},
        Film: {image: Film, id: 11},
        Music: {image: Music, id: 12},
        MusicalTheatre: {image: MusicalTheatre, id: 13},
        Television: {image: Television, id: 14},
        VideoGames: {image: VideoGames, id: 15},
        BoardGames: {image: BoardGames, id: 16},
        ScienceNature: {image: ScienceNature, id: 17},
        Computer: {image: Computer, id: 18},
        Math: {image: Mathematics, id: 19},
        Mythology: {image: Mythology, id: 20},
        Sports: {image: Sports, id: 21},
        Geography: {image: Geography, id: 22},
        History: {image: History, id: 23},
        Politics: {image: Politics, id: 24},
        Art: {image: Art, id: 25},
        Celebrities: {image: Celebrities, id: 26},
        Animals: {image: Animals, id: 27},
        Vehicles: {image: Vehicles, id: 28},
        Comics: {image: Comics, id: 29},
        Gadgets: {image: Gadgets, id: 30},
        Anime: {image: Anime, id: 31},
        Cartoons: {image: Cartoons, id: 32}
    }

    let [randomCategory, setRandomCategory] = useState([])
    const [score, setScore]= useState(0)
    let numDisplay = 9

    function randomizeCategory () {
        let keys = Object.keys(category) // Get all the keys in category

        // empty the random category beforehand
        setRandomCategory([])

        // for the number of keys that will be displayed on screen (9)
        for (let i = 0; i < numDisplay; i++) {

            // create random index
            const randomIndex = Math.floor(Math.random()*keys.length)

            // set random key using the random index
            const randomKey = keys[randomIndex]

            // Store the random key in a new random category array
            setRandomCategory(prevRandomCategory => [...prevRandomCategory, randomKey])

            // So that the same random index does not appear again
            keys.splice(randomIndex, 1) 
        }
    }

    // send the data to difficulty.jsx
    function sendData(data) {
        sendDataToParent(data)
    }

    // randomize the categories initially
    useEffect(() => {
        randomizeCategory()
    }, [])

    return (
        <div className="main-page" data-testid="main-component">
            <header className="game-header"> 
                <div className="randomize-icon-container">
                    <GiPerspectiveDiceSixFacesRandom className="randomize-icon" onClick={randomizeCategory} />
                </div>
                <div className="game-title-container">
                    <span className="quiz">Quiz</span><span className="quest">Quest</span>
                </div>
                <div className="high-score-container">
                    <p className="high-score">
                        HighScore: {score}
                    </p>
                </div>
            </header>
            <ul className="game-topic">
                {randomCategory.map((item, index) => {
                    return (
                        <li className="key-values" key={index}>
                            <Link className="key-link" to="/difficulty" onClick={() => sendData(category[item].id)}>
                                <p className="name">{item}</p>
                                <img className="topic" src={category[item].image} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Main