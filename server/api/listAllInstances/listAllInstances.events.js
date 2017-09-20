/**
 * listAllInstances model events
 */

'use strict';

import {EventEmitter} from 'events';
var listAllInstancesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
listAllInstancesEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(listAllInstances) {
  for(var e in events) {
    let event = events[e];
    listAllInstances.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    listAllInstancesEvents.emit(`${event}:${doc._id}`, doc);
    listAllInstancesEvents.emit(event, doc);
  };
}

export {registerEvents};
export default listAllInstancesEvents;
