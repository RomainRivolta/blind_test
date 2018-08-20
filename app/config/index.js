import _ from 'lodash'
import _default from './default' 
import development from './development'
const env = process.env.NODE_ENV

const config = {
    _default,
    development
}

let configObj = config._default

if(config[env]){
    configObj = _.merge(configObj,config[env])
}

export default {
    ...configObj
}