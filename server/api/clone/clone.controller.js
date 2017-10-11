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
  let createAMIParams = {
    InstanceId: request.body.instanceId,
    Name: request.body.instanceName,
    BlockDeviceMappings: [{
      DeviceName: request.body.rootDeviceName,
      Ebs: {
        DeleteOnTermination: true
      }
    }],
    Description: 'Cloned Instance',
    DryRun: false,
    NoReboot: true
  };

  //Create AMI based on the instanceID
  ec2.createImage(createAMIParams, function (error, data) {
    if (error) {
      response.json(error);
    } else {
      console.log(data.ImageId);
      waitForAMIState(data);
    }
  });

  let waitForAMIState = data => {
    let runInstanceParams = {
      ImageId: data.ImageId,
      MaxCount: 1,
      MinCount: 1,
      BlockDeviceMappings: [{
        DeviceName: '/dev/xvda',
        Ebs: {
          DeleteOnTermination: true,
        },
      }],
      DryRun: false,
      InstanceInitiatedShutdownBehavior: 'stop',
      KeyName: request.body.keyName,
      InstanceType: request.body.instanceType,
      TagSpecifications: [{
        ResourceType: 'instance',
        Tags: [{
          Key: 'Name',
          Value: request.body.instanceName
        }]
      }]
    };

    let waitForParams = {
      ImageIds: [data.ImageId],
    };

    let deRegisterImageParams = {
      ImageId: data.ImageId
    };

    //Wait for new Image to have the ready state
    ec2.waitFor('imageAvailable', waitForParams, function (error, data) {
      if (error) {
        response.json(error);
      } else {
        console.log('WAIT FOR: ', data);
        if (data) {
          //Create Instance from AMI Image
          runInstance(runInstanceParams, deRegisterImageParams);
        }
      }
    });
  };

  let deleteImage = deRegisterImageParams => {
    ec2.deregisterImage(deRegisterImageParams, function (error, data) {
      if (error) {
        response.json(error);
      } else {
        console.log('Deleted AMI: ', data);
        response.send(data);
      }
    });
  };

  let runInstance = runInstanceParams => {
    ec2.runInstances(runInstanceParams, function (error, data) {
      if (error) {
        response.json(error);

        //Delete AMI if not successful
        deleteImage();
      } else {
        console.log('RUN INSTANCE OUTPUT: ', data);

        callback(data);
      }
    });
  };

  let callback = data => response.send(data);
}
