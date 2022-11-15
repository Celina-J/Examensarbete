'use client';

export default class ErrorEmitter{
    constructor(){}

    send(message, type='error'){
        let event = new CustomEvent('global-message-popup', {
            detail: {
                type: type,
                message: message
            }
        });
        document.dispatchEvent(event);
    }
   
}

