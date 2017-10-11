/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/restarts              ->  index
 */

'use strict';

let aws = require('aws-sdk');
// var util = require('util');

aws.config.update({region: 'eu-west-1'});

let ec2 = new aws.EC2();

// Restarts an Instance
export function index(request, response) {
  let params = {
    InstanceIds: [request.body.instanceId],
    Name: [request.body.instanceName],
    BlockDeviceMappings: [
      {
        DeviceName: ''
      }
    ],
    DryRun: true,

  };

  //Call EC2 to start the selected instance
  ec2.startInstances(params, function (error, data) {
    if (error) {
      response.json(error);
    } else {
      callback(data);
    }
  });

  let callback = data => response.send(data);
}
