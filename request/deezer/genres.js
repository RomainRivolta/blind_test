import request from 'request-promise'
import errors from 'request-promise/errors'
import fs from 'fs'
import path from 'path'
import config from '../../app/config'
import api from './api'
import uuidv1 from 'uuid/v1'

const getAllGenres = () => {
    const session = uuidv1()
    api.apiDeezer('https://api.deezer.com/genre',session).then((result) => {
        var genre = result.data.map(element => {
            let obj = {}
            obj = {
                id: element.id,
                name: element.name
            }
            return obj
        })
                            
        fs.appendFile(path.join(__dirname,'../../app/deezer/genre.json'),
        JSON.stringify(genre,null,'\t'),
        {
            flag:'w+'
        },(err) => {
            if(err) throw err
        })
    })
}

getAllGenresGenres()
