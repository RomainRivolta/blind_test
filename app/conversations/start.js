'use strict'

export default {
    'StartState': {
        'YesIntent': function(){
            this.followUpState('ConfigState').ask(this.t(('START.Q_CONFIG')))
        },

        'NoIntent': function(){
            this.tell(this.t('EXIT'))
        },

        'Unhandled': function(){
            let speech = this.t('START.UNHANDLED')
            let reprompt = this.t('REPROMPT')
            this.ask(speech,reprompt)
        },
    }
}