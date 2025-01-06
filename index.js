/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let game of games) {
        // Create a div element and assign it the class 'game-card'
        let gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // Create an img element and set its src attribute
        let img = document.createElement("img");
        img.src = game.img;
        img.style.width = "100%"; 
        img.style.height = "auto"; 
        img.style.objectFit = "cover"; 

        // Create an h2 element and set its text content
        let title = document.createElement("h2");
        title.textContent = game.name;

        // Create a p element and set its text content
        let description = document.createElement("p");
        description.textContent = game.description;

        // Append the img, h2, and p elements to the gameCard div
        gameCard.appendChild(img);
        gameCard.appendChild(title);
        gameCard.appendChild(description);

        // Append the gameCard to the gamesContainer
        let gamesContainer = document.getElementById("games-container");
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString("en-US");


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const AmountraisedCard = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
raisedCard.innerHTML = "$" + AmountraisedCard.toLocaleString("en-US");


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

   let unfundedGames = GAMES_JSON.filter((game)=>{
    return game.pledged < game.goal;
   });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let fundedGames = GAMES_JSON.filter((game)=>{
        return game.pledged >= game.goal;
       });
        // use the function we previously created to add the unfunded games to the DOM
        addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game)=>{
    return game.pledged < game.goal;
});

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = unfundedGames.length === 0 ? `A total of ${AmountraisedCard} There are no unfunded games` : `A total of $${AmountraisedCard} have been raised and There are ${unfundedGames.length} unfunded games please continue to support these amazing projects!`; 

// create a new DOM element containing the template string and append it to the description container
const unfundedGamesElement = document.createElement("h2");
unfundedGamesElement.textContent = unfundedGamesString;
descriptionContainer.appendChild(unfundedGamesElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUp] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameName = document.createElement("h2");
topGameName.textContent = topGame.name;
firstGameContainer.appendChild(topGameName);
// do the same for the runner up item
const runnerUpName = document.createElement("h2");
runnerUpName.textContent = runnerUp.name;
secondGameContainer.appendChild(runnerUpName);