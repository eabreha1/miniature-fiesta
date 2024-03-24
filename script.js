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
  
    // Function to display NBA games data
    async function displayNbaGames() {
      const games = await fetchNbaGames(); // Fetch NBA games data
      console.log("Information for All Games:");
      games.forEach((game, index) => {
        console.log(`Game ${index + 1}:`);
        console.log(`Game ID: ${game.id}`);
        console.log(`League: ${game.league}`);
        console.log(`Season: ${game.season}`);
        console.log(`Date: ${game.date.start}`);
        console.log(`Arena Name: ${game.arena.name}`);
        console.log(`City: ${game.arena.city}`);
        console.log(`State: ${game.arena.state}`);
        console.log(`Visitor Team: ${game.teams.visitors.name} Score: ${game.scores.visitors.points}`);
        console.log(`Home Team: ${game.teams.home.name} Score: ${game.scores.home.points}`);
        console.log("");
      });
    }
  
    // Event listener for the "Discover Today's Games" button
    const discoverGamesBtn = document.getElementById('discover-games-btn');
    discoverGamesBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default form submission behavior
      displayNbaGames(); // Fetch and display NBA games data
    });
  });
  