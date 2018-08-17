import request from 'request-promise'
import request from 'request-promise/errors'

export default () => {

    const p = () => {
        const url = 'https://api.deezer.com/genre/output=json'
        var options = {
            uri: url,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            json:true
        }

        request(options).then((result) => {

        }).catch(errors.StatusCodeError, (reason) => {
            switch (reason) {
                case 4:
                    console.error('Quota')
                    break;
                case 100:
                    console.error('ITEMS_LIMIT_EXCEEDED')
                    break;
                default:
                    break;
            }
        })
    }
}