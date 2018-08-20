import request from 'request-promise'
import errors from 'request-promise/errors'
import uuidv1 from 'uuid/v1'
import fs from 'fs'
import path from 'path'
import config from '../config'

const certFile = path.resolve(__dirname, '../../ssl/GE_External_Root_CA_2_1.pem')

let ca,proxy 

if(true){
    ca = fs.readFileSync(certFile)
    proxy= 'http://PITC-Zscaler-EMEA-London3PR.proxy.corporate.ge.com:80'
}


const getGenres = () => {
    const url = 'https://api.deezer.com/genre'
    const session = uuidv1()
    let options = {
        uri: url,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
        proxy,
        ca,
        simple: false,
        body:{
            session
        },
        json:true,
    }

    request(options).then((response) => {
        if(response.error){
            let code = response.error.code
            let errorType = response.error.type
            let errorMessage = response.error.message

            switch (code) {
                case 4:
                    console.error(`Type error ${errorType} message ${errorMessage}`)
                    return

                case 100:
                    console.error(`Type error ${errorType} message ${errorMessage}`)
                    return   

                case 200:
                    console.error(`Type error ${errorType} message ${errorMessage}`)
                    return 

                case 300:
                    console.error(`Type error ${errorType} message ${errorMessage}`)
                    return 

                case 500:
                    console.error(`Type error ${errorType} message ${errorMessage}`)
                    return 

                case 501:
                    console.error(`Type error ${errorType} message ${errorMessage}`)
                    return 

                case 600:
                    console.error(`Type error ${errorType} message ${errorMessage}`)
                    return 

                case 700:
                    console.error(`Type error ${errorType} message ${errorMessage}`)
                    return 

                case 800:
                    console.error(`Type error ${errorType} message ${errorMessage}`)
                    return 

                default:
                    break;
            }
        } else {
            console.log(response)
        }
    }).catch((errors) => {
        console.error(errors)
    })
}
getGenres()
