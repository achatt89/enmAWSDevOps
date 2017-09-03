/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/listAllInstancess              ->  index
 */

'use strict';

var aws = require('aws-sdk');
var util = require('util');

aws.config.update({region: 'eu-west-1'});

var ec2 = new aws.EC2();

// Gets a list of ListAllInstances
export function index(request, response) {
  ec2.describeInstances(function (error, data) {
    if (error) {
      response.json(error);
    }
    else {
      callback(util.format('%j', data));
    }
  });
  function callback(data) {
    response.send(data);
  }
}
