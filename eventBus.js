//create event bus
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }

module.exports = {
    notifyEvent: notifyEvent,
    addEventListener: addEventListener,
    addOnceEventListener: addOnceEventListener,
    removeEventListener: removeEventListener
}

const eventBus = new MyEmitter();

//CONTRACT : every eventListener must receive an object called parameters with the real parameters defined inside it

function notifyEvent(eventName, parameters) {
    eventBus.emit(eventName, parameters);
}

function addEventListener(eventName, eventListener){
    eventBus.on(eventName, eventListener);
}

function addOnceEventListener(eventName, eventListener){
    eventBus.once(eventName, eventListener);
}

function removeEventListener(eventName){
    eventBus.removeListener(eventName);
}

