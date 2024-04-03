document.addEventListener('DOMContentLoaded', async function() {
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
    const predictions = await readCsvFile(); // Read predictions from CSV
    const gamesList = document.getElementById('games-list');

    // Clear previous content
    gamesList.innerHTML = '';

    games.forEach((game, index) => {
      const gameElement = document.createElement('div');
      gameElement.classList.add('game');
      gameElement.innerHTML = `
        <h3>Game ${index + 1}</h3>
        <p><strong>Visitor Team:</strong> ${game.teams.visitors.name} </p>
        <p><strong>Home Team:</strong> ${game.teams.home.name} </p>
        <p><strong>Prediction for Home Team:</strong> ${predictions[game.teams.home.name]}</p>
        <p><strong>Prediction for Visitor Team:</strong> ${predictions[game.teams.visitors.name]}</p>
        <hr>
      `;
      gamesList.appendChild(gameElement);
    });
  }

  // Call the displayNbaGames function when the DOM content is loaded
  displayNbaGames();
});


    
  
  