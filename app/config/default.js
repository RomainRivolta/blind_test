require('dotenv').config()

export default {
    'api_key': process.env.API_KEY,
    'api_url': 'http://api.musixmatch.com/ws/1.1/',
    'genres':['Pop','Films/Games','Dance','R&B','All']
}