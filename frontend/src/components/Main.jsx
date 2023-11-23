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

function Main() {

    const category = {
        generalKnowledge: {image: GeneralKnowledge, id: 9},
        books: {image: Books, id: 10},
        film: {image: Film, id: 11},
        music: {image: Music, id: 12},
        musicalTheatre: {image: MusicalTheatre, id: 13},
        television: {image: Television, id: 14},
        videoGames: {image: VideoGames, id: 15},
        boardGames: {image: BoardGames, id: 16},
        scienceNature: {image: ScienceNature, id: 17},
        computer: {image: Computer, id: 18},
        math: {image: Mathematics, id: 19},
        mythology: {image: Mythology, id: 20},
        sports: {image: Sports, id: 21},
        geography: {image: Geography, id: 22},
        history: {image: History, id: 23},
        politics: {image: Politics, id: 24},
        art: {image: Art, id: 25},
        celebrities: {image: Celebrities, id: 26},
        animals: {image: Animals, id: 27},
        vehicles: {image: Vehicles, id: 28},
        comics: {image: Comics, id: 29},
        gadgets: {image: Gadgets, id: 30},
        anime: {image: Anime, id: 31},
        cartoons: {image: Cartoons, id: 32}
    }

    let [randomCategory, setRandomCategory] = useState([])
    let [display, setDisplay] = useState(false)
    let numDisplay = 9

    function randomizeCategory () {
        let keys = Object.keys(category) // Get all the keys in category
        setRandomCategory([])
        for (let i = 0; i < numDisplay; i++) {
            const randomIndex = Math.floor(Math.random()*keys.length)
            const randomKey = keys[randomIndex]
            setRandomCategory(prevRandomCategory => [...prevRandomCategory, randomKey])
            keys.splice(randomIndex, 1) 
        }
    }

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
            </header>
            <ul className="game-topic">
                {randomCategory.map((item, index) => {
                    return (
                        <li className="key-values" key={index}>
                            <Link className="key-link" to="/difficulty">
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