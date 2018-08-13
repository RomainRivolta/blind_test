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
    },

    'ConfigState':{

        'AnswerConfigIntent':function(answerConfig){ 
            if(answerConfig.value === 'seul' || answerConfig.value === 'only'){
                this.ask('seul')
            } else {
                this.followUpState('ConfigState.ConfigTeamState.AnswersNumberTeamIntent')
                    .ask(this.t('CONFIG_GAME.CONFIG_GAME_TEAM.NUMBER_TEAM'))
            }
        },

        'Unhandled': function(){
            let speech = this.t('CONFIG_GAME.UNHANDLED')
            let reprompt = this.t('REPROMPT')
            this.ask(speech,reprompt)
        },

        'ConfigTeamState': {

            'AnswersNumberTeamIntent': function(numberTeam){
                for(let i=0; i < numberTeam.value; i++){
                    this.ask('Nom' + 1)
                }
                this.ask(numberTeam.value)
            },

            // 'Unhandled': function(){
            //     let speech = this.t('CONFIG_GAME.CONFIG_GAME_TEAM.UNHANDLED')
            //     let reprompt = this.t('REPROMPT')
            //     this.ask(speech,reprompt)
            // },
        }

    }
}