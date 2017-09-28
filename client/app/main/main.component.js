import angular from 'angular';

const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  $http;
  socket;

  /*@ngInject*/
  constructor($http, socket) {
    this.$http = $http;
    this.socketIO = socket;
    this.socketIO.socket.connect('http://localhost:4000');
  }

  $onInit() {
    this.$http({
      method: 'GET',
      url: '/api/listAllInstances',
      transformResponse: function (response) {
        return response;
      }
    })
      .then(response => {
        let socket = this.socketIO.socket;
        socket.on('fetchInstanceList', function (data) {
          console.log(data);
        });
        if (typeof response.data === 'string') {
          this.instanceList = JSON.parse(response.data);
          console.log('API RESPONSE: ', this.instanceList);
        }
      });

    this.showInfoDropDown = function (index) {
      this.showInstanceInfo = index;
    };

    this.hideInstanceInfo = function (index) {
      this.showInstanceInfo = undefined;
    };

    this.convertDateTime = function (str) {
      return new Date(str);
    };

    this.cloneInstance = function (index) {
      let instanceId = this.instanceList.Reservations[index].Instances[0].InstanceId;
      let instanceName = this.instanceList.Reservations[index].Instances[0].Tags[0].Value + '_copy1';
      let instanceType = this.instanceList.Reservations[index].Instances[0].InstanceType;
      let keyName = this.instanceList.Reservations[index].Instances[0].KeyName;

      this.$http({
        method: 'PUT',
        url: 'api/clones',
        data: {
          instanceId: instanceId,
          instanceName: instanceName,
          instanceType: instanceType,
          keyName: keyName,

        },

        transformResponse: function (response) {
          return response;
        }
      }).then(response => {
        console.log('API CLONE RESPONSE: ', response.data);
      });
    };

    this.restartInstance = function (index) {
      let instanceId = this.instanceList.Reservations[index].Instances[0].InstanceId;

      this.$http({
        method: 'PUT',
        url: '/api/restarts',
        data: {instanceId: instanceId},
        transformResponse: function (response) {
          return response;
        }
      }).then(response => {
        console.log('API RESTART RESPONSE: ', response.data);
      });
    };

    this.stopInstance = function (index) {
      let instanceId = this.instanceList.Reservations[index].Instances[0].InstanceId;

      this.$http({
        method: 'PUT',
        url: '/api/stops',
        data: {instanceId: instanceId},
        transformResponse: function (response) {
          return response;
        }
      }).then(response => {
        console.log('API RESTART RESPONSE: ', response.data);
      });
    };
  }
}

export default angular.module('enmAwsdevOpsApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
