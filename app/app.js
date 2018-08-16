'use strict'

import conversation from './conversations'

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework')

const config = {
    logging: true,
};

const app = new App(config)

// =================================================================================
// App Logic
// =================================================================================

const asa = Object.assign(conversation)

const handlers = {
    'LAUNCH': function() {
        let speech = this.speechBuilder()
            .addT(this.t('NEW_GAME_MESSAGE', { gameName: 'blind test' } ))
            .addT(this.t('EXPLICATION'))
            .addT(this.t('WELCOME'))
        this.followUpState('StartState').ask(speech);
    }
}

app.setHandler(handlers,conversation)

module.exports.app = app;