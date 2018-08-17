import genres from '../musixmatch/genre'

import config from '../config'

export default {
    'GameState':{
        'GameIntent':function(){
            const url = config.api_url + '&apikey=' + config.api_key
            const options = {
                uri: url,
                method: "GET",
            }
        }
    }
}
