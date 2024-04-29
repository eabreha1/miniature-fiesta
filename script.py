# 4f5a182f-ec69-46e3-afc2-d80b19c9096d
import requests

def get_nba_games(api_key):
    url = 'https://www.balldontlie.io/api/v1/games'
    headers = {'Authorization': '{}'.format(api_key)}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for bad requests
        data = response.json()
        
        if 'data' in data:
            return data['data']
        else:
            print("No game data found.")
            return []
    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)
        print("Response content:", response.content)
        return []

# Replace 'YOUR_API_KEY' with your actual API key
api_key = '4f5a182f-ec69-46e3-afc2-d80b19c9096d'
games = get_nba_games(api_key)

if games:
    print("NBA Games:")
    for game in games:
        home_team = game['home_team']['full_name']
        visitor_team = game['visitor_team']['full_name']
        game_date = game['date']
        print(f"{home_team} vs {visitor_team} on {game_date}")
