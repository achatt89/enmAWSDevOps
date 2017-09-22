/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';


// Setup server
let app = express();
let server = http.createServer(app);
let socketIO = require('socket.io')(server, {
  serverClient: config.env !== 'production',
  path: '/socket.io-client'
});

require('./config/socketio').default(socketIO);
require('./config/express').default(app);
require('./routes').default(app);

socketIO.on('connection', function(client) {
  console.log('Client Connected');

  client.on('join', function(data) {
    console.log('Client Message: ', data);
  });
});
// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
