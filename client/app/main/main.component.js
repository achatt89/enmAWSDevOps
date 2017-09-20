import angular from 'angular';

const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  $http;
  socket;

  /*@ngInject*/
  constructor($http,socket) {
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
          console.log(this.socket.syncUpdates('instanceList', this.instanceList));
          console.log(this.instanceList);
        }
      });

    this.rowClick = function () {
      this.showInstanceInfo = !this.showInstanceInfo;
      console.log(this.showInstanceInfo);
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
