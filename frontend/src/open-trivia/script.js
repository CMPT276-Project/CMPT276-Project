const axios = require('axios')

/*

Category: {
    General Knowledge - 9
    Entertainment: Books - 10
    Entertainment: Film - 11
    Entertainment: Music - 12
    Entertainment: Musicals & Theatres - 13
    Entertainment: TV - 14
    Entertainment: Video Games - 15
    Entertainment: Board Games - 16
    Science & Nature - 17
    Science: Computers - 18
    Science: Math - 19
    Mythology - 20
    Sports - 21
    Geography - 22
    History - 23
    Politics - 24
    Art - 25
    Celebrities - 26
    Animals - 27
    Vehicles - 28
    Entertainment: Comics - 29
    Science: Gadgets - 30
    Entertainment: Japanese Manga & Anime - 31
    Entertainment: Cartoon & Animations - 32
}

const params = {
    amount
    category
    difficulty
    type
}

*/

let amount = 25
let difficulty = ['easy', 'medium', 'hard']
let type = ['mutiple', 'boolean']

async function getTriviaData() {

    const response = await axios.get(apiURL, { params }) 

}

// axios.get(apiURL, { params })
//     .then(response => {
//         const resp = response.data.results;
//         console.log(resp)
//     })
//     .catch(error => {
//         console.error("Error fetching data", error)
//     })

// // Make api call to opentrivia api
// async function getTriviaData () {
//     const resp = await axios.get("https://opentdb.com/api.php?amount=25&category=15&difficulty=easy&type=multiple")
//     console.log(resp.data.results)
// }

// getTriviaData()

// const TriviaComponent = () => 
// {
//     const [questions, setQuestion] = useState([])
//     const [category, setCategory] = useState("")
//     const [difficulty, setDifficulty] = useState([])
//     const [score, setScore] = useState(0)

// }

// TriviaComponent()