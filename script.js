document.addEventListener('DOMContentLoaded', async function() {
  await displayNbaGames();
});

// Function to fetch NBA games data
async function fetchNbaGames() {
  const url = 'https://api-nba-v1.p.rapidapi.com/games?date=2024-04-03';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '89059b1fa1msha28ea0ffba8282cp1d3c69jsncb65397339ac',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); // Parse response JSON
    return data.response; // Return the games data
  } catch (error) {
    console.error(error);
  }
}

// Function to fetch and parse CSV data
async function fetchAndParseCSV() {
  try {
    // Fetch csv file from github repo
    const csvResponse = await fetch('https://raw.githubusercontent.com/NBA-Predictions/miniature-fiesta/main/dummyResults.csv');
    const csvData = await csvResponse.text();
    // Split CSV data into rows and columns
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');
    const data = [];

    // Loop through rows starting from index 1 (to skip headers)
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(',');
      const entry = {};

      // Loop through each column in the row
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = rowData[j];
      }

      data.push(entry);
    }
    return data;
  } catch (error) {
    console.error('Error fetching or parsing CSV file:', error);
  }
}

// Function to match team prediction with corresponding game
function matchPredictionToGame(game, csvData) {
  // Loop through CSV data
  for (let i = 0; i < csvData.length; i++) {
    // Check if the team in the CSV data matches the home team of the game
    const team = csvData[i].HOME_TEAM_ID;
    // If the team matches, set the predicted winner of the game
    if (team === game.teams.home.nickname) {
      // If the prediction is 1, the home team is the predicted winner
      if (parseInt(csvData[i].predictions) === 1) {
        game["predictedWinner"] = game.teams.home.nickname;
      // If the prediction is 0, the visitor team is the predicted winner
      } else {
        game["predictedWinner"] = game.teams.visitors.nickname;
      }
    }
  }
  return game;
}

// Function to read CSV file and parse predictions
async function readCsvFile() {
  const url = 'https://raw.githubusercontent.com/NBA-Predictions/miniature-fiesta/main/dummyResults.csv'; // Adjust the path to your CSV file
  try {
    const response = await fetch(url);
    const text = await response.text();
    const predictions = {};
    text.split('\n').forEach(line => {
      if (line.trim() !== '') { // Skip empty lines
        const [team, prediction] = line.trim().split(',');
        predictions[team.trim()] = prediction.trim();
      }
    });
    return predictions;
  } catch (error) {
    console.error(error);
  }
}

// Function to display NBA games data on HTML page
async function displayNbaGames() {
  const games = await fetchNbaGames(); // Fetch NBA games data
  const csvData = await fetchAndParseCSV(); // Fetch and parse CSV data
  const predictions = await readCsvFile(); // Read predictions from CSV
  const gamesList = document.getElementById('games-list');

  // Clear previous content
  gamesList.innerHTML = '';

  games.forEach((game, index) => {
    const updatedGame = matchPredictionToGame(game, csvData);
    const gameElement = document.createElement('div');
    gameElement.classList.add('game');
    gameElement.innerHTML = `
      <h3>Game ${index + 1}</h3>
      <p><strong>Visitor Team:</strong> ${updatedGame.teams.visitors.name} </p>
      <p><strong>Home Team:</strong> ${updatedGame.teams.home.name} </p>
      <p><strong>Predicted Winner:</strong> ${updatedGame.predictedWinner}</p>
    `;
    gamesList.appendChild(gameElement);
  });
}


  