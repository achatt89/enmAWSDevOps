/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/restarts              ->  index
 */

'use strict';

let aws = require('aws-sdk');

aws.config.update({region: 'eu-west-1'});

let ec2 = new aws.EC2();

// Stops an Instance
export function index(request, response) {
  let params = {
    InstanceIds: [request.body.instanceId],
    DryRun: false
  };
  
  //Call EC2 to start the selected instance
  ec2.stopInstances(params, function (error, data) {
    if (error) {
      response.json(error);
    } else {
      callback(data);
    }
  });

  function callback(data) {
    response.send(data);
  }
}
