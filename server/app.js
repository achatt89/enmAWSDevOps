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
let io = require('socket.io')(server, {
  path: '/socket.io-client',
  serverClient: config.env !== 'production'
});

app.set('io', io);

require('./config/socketio').default(io);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });

  io.on('connection', function() {
    console.log('Client Connected');
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
