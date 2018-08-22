import genres from '../musixmatch/genre'
import config from '../config'
import path from 'path'
import fs from 'fs'


export default {
    'GameState':{
        'GameIntent':function(){
            const pathGenres = path.resolve(__dirname,'../deezer/genre.json')
            try {
                let contents = JSON.parse(fs.readFileSync(pathGenres))
                
            } catch (error) {
                console.log(error)
            }
        }
    }
}
