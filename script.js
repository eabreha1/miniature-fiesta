// Function to fetch NBA games data
document.addEventListener('DOMContentLoaded', async function() {
  // Function to fetch NBA games data
  async function fetchNbaGames() {
    const url = 'https://api-nba-v1.p.rapidapi.com/games?date=2024-04-01';
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

  // Function to display NBA games data on HTML page
  async function displayNbaGames() {
    const games = await fetchNbaGames(); // Fetch NBA games data
    const gamesList = document.getElementById('games-list');

    // Clear previous content
    gamesList.innerHTML = '';

    // Create and append HTML elements for each game
    games.forEach((game, index) => {
      const gameElement = document.createElement('div');
      gameElement.classList.add('game');
      gameElement.innerHTML = `
        <h3>Game ${index + 1}</h3>
        <p><strong>Visitor Team:</strong> ${game.teams.visitors.name} </p>
        <p><strong>Home Team:</strong> ${game.teams.home.name} </p>
        <p><strong> Prediction:</strong> </P>
        <hr>
      `;
      gamesList.appendChild(gameElement);
    });
  }

  // Call the displayNbaGames function when the DOM content is loaded
  displayNbaGames();
});

