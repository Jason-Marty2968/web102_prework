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
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
// total contributions (sum of backers)
const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// total amount raised (sum of pledged)
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// number of games
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;



// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised


// set inner HTML using template literal


// grab number of games card and set its inner HTML



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfunded = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfunded);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const funded = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(funded);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

const descriptionStr = `
A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games.
Currently, ${unfundedCount} ${unfundedCount === 1 ? "game remains" : "games remain"} unfunded.
We need your help to fund these amazing projects!
`;

const descElement = document.createElement("p");
descElement.innerHTML = descriptionStr;
descriptionContainer.appendChild(descElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const [firstGame, secondGame] = sortedGames;

const firstGameElement = document.createElement("h4");
firstGameElement.innerText = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement("h4");
secondGameElement.innerText = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
