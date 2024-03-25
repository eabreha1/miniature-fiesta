// Function to fetch NBA games data
document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch NBA games data
  async function fetchNbaGames() {
    const url = 'https://api-nba-v1.p.rapidapi.com/games?date=2024-03-24';
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
        <p><strong>Game ID:</strong> ${game.id}</p>
        <p><strong>League:</strong> ${game.league}</p>
        <p><strong>Season:</strong> ${game.season}</p>
        <p><strong>Date:</strong> ${game.date.start}</p>
        <p><strong>Arena Name:</strong> ${game.arena.name}</p>
        <p><strong>City:</strong> ${game.arena.city}</p>
        <p><strong>State:</strong> ${game.arena.state}</p>
        <p><strong>Visitor Team:</strong> ${game.teams.visitors.name} (Score: ${game.scores.visitors.points})</p>
        <p><strong>Home Team:</strong> ${game.teams.home.name} (Score: ${game.scores.home.points})</p>
        <hr>
      `;
      gamesList.appendChild(gameElement);
    });
  }

  // Event listener for the "Discover Today's Games" button
  const discoverGamesBtn = document.getElementById('discover-games-btn');
  discoverGamesBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    displayNbaGames(); // Fetch and display NBA games data
  });
});
