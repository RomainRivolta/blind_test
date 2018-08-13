'use strict'

export default {

    'ConfigState':{

        'AnswerConfigIntent':function(answerConfig){ 
            if(answerConfig.value === 'seul' || answerConfig.value === 'only'){
                this.ask('seul')
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
                    this.setSessionAttribute('numberTeam',numberTeam)
                    this.followUpState('ConfigTeamNameState.AnswerNameTeamIntent')
                        .ask(this.t('CONFIG_GAME.CONFIG_GAME_TEAM.NAME_TEAM',{ numberTeam: 1 }))
                }
            },

            'NextTeamIntent': function(data){
                console.log(`DATA ${data}`)
            console.log(this.getSessionAttributes())

                this.followUpState('ConfigTeamNameState.AnswerNameTeamIntent')
                    .ask(this.t('CONFIG_GAME.CONFIG_GAME_TEAM.NAME_TEAM',{ numberTeam: data }))
            },

            // 'Unhandled': function(){
            //     let speech = this.t('CONFIG_GAME.CONFIG_GAME_TEAM.UNHANDLED')
            //     let reprompt = this.t('REPROMPT')
            //     this.ask(speech,reprompt)
            // },
    },

    'ConfigTeamNameState': {

        'AnswerNameTeamIntent': function(nameTeam){

            console.log(this.getSessionAttributes())

            let numberTeam = this.getSessionAttribute('numberTeam')
            let remainingTeam
            if(this.getSessionAttribute('remainingTeam') == null){
                remainingTeam = numberTeam.value - 1
            } else {
                remainingTeam = this.getSessionAttribute('remainingTeam').value - 1
            }

            console.log(`remainingTeam >>>>>>>>> ${remainingTeam.value}`)
            this.setSessionAttribute('remainingTeam',remainingTeam)

            if(numberTeam != null)
                console.log(`NUMBER TEAM ${numberTeam.value}`)

            if(remainingTeam != null)
                console.log(`P ${remainingTeam.value}`)

            // let remainingTeam = this.getSessionAttribute('remainingTeam') != null ? this.getSessionAttribute('remainingTeam').value - 1 : this.getSessionAttribute('numberTeam').value - 1
            // this.setSessionAttribute('nameTeam',nameTeam)

            // console.log(`REAMING TEAM ${remainingTeam}`)

            if(numberTeam.value > 0){
                let nextTeam = this.getSessionAttribute('nextTeam') == null ? 2 : this.getSessionAttribute('nextTeam') +1
                this.setSessionAttribute('nextTeam',nextTeam)
                let data = nextTeam
                this.toIntent('ConfigTeamNumberState.NextTeamIntent',data)
            } else {
                this.ask("let' go")
            }
        },
    }
}