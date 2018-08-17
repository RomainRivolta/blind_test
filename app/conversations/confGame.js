'use strict'

export default {

    'ConfigState':{
        'AnswerConfigIntent':function(answerConfig){ 
            if(answerConfig.value === 'seul' || answerConfig.value === 'only'){
                this.toStateIntent('GameState','GameIntent')
            } else {
                this.followUpState('ConfigTeamNumberState.AnswersNumberTeamIntent')
                    .ask(this.t('CONFIG_GAME.CONFIG_GAME_TEAM.NUMBER_TEAM'))
            }
        },

        'Unhandled': function(){
            let speech = this.t('CONFIG_GAME.UNHANDLED')
            let reprompt = this.t('REPROMPT')
            this.ask(speech,reprompt)
        },
    },

    'ConfigTeamNumberState': {
            'ErrorNumberTeamIntent':function(){
                let speech = this.t('CONFIG_GAME.CONFIG_GAME_TEAM.ERROR_NUMBER_TEAM')
                let reprompt = this.t('REPROMPT')
                this.ask(speech,reprompt)
            },

            'AnswersNumberTeamIntent': function(numberTeam){
                if(numberTeam.value <= 1){
                    this.toIntent('ConfigTeamNumberState.ErrorNumberTeamIntent')
                } else {
                    let _numberTeam = numberTeam.value
                    let remainingTeam = 1
                    this.setSessionAttribute('numberTeam',_numberTeam)
                    this.setSessionAttribute('remainingTeam',remainingTeam)
                    this.followUpState('ConfigTeamNameState.AnswerNameTeamIntent')
                        .ask(this.t('CONFIG_GAME.CONFIG_GAME_TEAM.NAME_TEAM',{ numberTeam: 1 }))
                }
            },

            'NextTeamIntent': function(){
                let attrNextTeam = this.getSessionAttribute('nextTeam')
                let nextTeam = attrNextTeam  == null ? 2 : attrNextTeam
                this.followUpState('ConfigTeamNameState.AnswerNameTeamIntent')
                    .ask(this.t('CONFIG_GAME.CONFIG_GAME_TEAM.NAME_TEAM',{ numberTeam: nextTeam }))
            },
    },

    'ConfigTeamNameState': {
        'AnswerNameTeamIntent': function(nameTeam){
            let numberTeam  = this.getSessionAttribute('numberTeam')
            let remainingTeam  = this.getSessionAttribute('remainingTeam') + 1
            let numTeam = 'team' + this.getSessionAttribute('remainingTeam')
            this.setSessionAttribute(numTeam,nameTeam.value)
            this.setSessionAttribute('remainingTeam',remainingTeam)
            this.setSessionAttribute('nextTeam',remainingTeam)
            if(remainingTeam <= numberTeam){
                this.followUpState('ConfigTeamWordState').ask(this.t('CONFIG_GAME.CONFIG_GAME_TEAM.CRY_TEAM',remainingTeam))
            } else {
                this.toStateIntent('GameState','GameIntent')
            }
        },
    },

    'ConfigTeamWordState':{
        'AnswerWordTeamIntent': function(wordTeam){
            this.toIntent('ConfigTeamNumberState.NextTeamIntent')
        }
    }
}