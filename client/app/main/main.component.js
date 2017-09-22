import angular from 'angular';

const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  $http;
  socket;

  /*@ngInject*/
  constructor($http, socket) {
    this.$http = $http;
    this.socket = socket;
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
        if (typeof response.data === 'string') {
          this.instanceList = JSON.parse(response.data);
          this.socket.syncUpdates('instanceList', this.instanceList);
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
