import config from '../config'
import path from 'path'
import fs from 'fs'
import artists from '../../request/deezer/artists'


export default {
    'GameState':{
        'GameIntent':function(){
            const pathGenres = path.resolve(__dirname,'../deezer/genre.json')
            try {
                let contents = JSON.parse(fs.readFileSync(pathGenres))
                let genreConfig = config.genres
                let res = genreConfig.map(element => {
                    return contents.find(genre => genre.name === element)
                })

                let idGenre = 

                artists.getArtistByIdGenre()


                this.ask("ok")
            } catch (error) {
                console.log(error)
            }
        }
    }
}
