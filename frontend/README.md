# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Before you run the project:

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

### Code explanation

Hierarchy of the codes:

1. index.js
2. App.js
3. Main.jsx, Difficulty.jsx, Gameplay.jsx, Loser.jsx, Winner.jsx, BackIcon.jsx

Ordering of the code that is shown on screen when the user plays the game:
1. App.js
2. Main.jsx
3. Difficulty.jsx
4. Gameplay.jsx
5. Loser.jsx / Winner.jsx

App.js:
- Root of all components (.jsx files)
- Contains the routes to all the components in the project

Main.jsx:
- Displays the categories of the trivia question that the user can pick from. These categories can be randomized by pressing the random box icon. After the user selects the category by clicking, the selected category id is sent to Difficulty.jsx
  How the category implementation works:
  - Categories are intialized in a dictionary where each key represents the category of the trivia question and contains { image of the category, id of the category } as its values
  How the randomizer implementation works:
  - Creates a random key using random index and store it in the random category array

Difficulty.jsx:
- There are 3 difficulty selections (easy, medium and hard) that the user can select from.
- After the user selects one of the doors, an api call will be made with the following parameters { id of the category, amount of the questions, difficulty } to open trivia database api, the response (the response is a block of data that contain 10 different trivia questions with the following attributes (type of question, correct answer, incorrect answers, question) ) from the api call is sent to Gameplay.jsx
  
Gameplay.jsx:
- All the attributes of the response are processed, intialized and displayed on screen.
- Contains all gameplay condition
  - If the user answers correctly, user is sent to Winner.jsx
  - If the user answers incorrectly, user is sent to Loser.jsx
- Contains timer
  - timer starts at 60 and decrements until timer hits 0. If the user does not answer by the time hits 0, user is sent to Loser.jsx
- Contains score
  - score is calculated based on how fast the user answers the question
  How score is implemented:
  - Subtract 100 by time taken to answer question

Loser.jsx & Winner.jsx:
- Api call is made to Giphy API with a set of parameters { api key, tag, rating, limit }
  - tag is a type of gif (eg. sad gif, happy gif, meme gif)
  - rating is age-appropriateness (eg. pg-13, rated r)
  - limit is the number of gifs
- Gif is stored in array, randomized and displayed on screen
- Total score is displayed on screen 
