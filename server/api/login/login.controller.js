/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/logins              ->  index
 */

'use strict';

let sha256 = require('js-sha256');

export function index(request, response) {
  const username = sha256('administrator');
  const password = sha256('TestPassw0rd');

  if(request.body.username === username && request.body.password === password) {
    response.send('success');
  } else {
    response.json('Login Failure');
  }
}
