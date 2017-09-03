import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  $http;

  awesomeThings = [];

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http({
      method: 'GET',
      url: '/api/listAllInstances',
      transformResponse: function(response)
      {
        return response;
      }
    })
      .then(response => {
        if (typeof response.data === 'string') {
          this.instanceList = JSON.parse(response.data);
          console.log(this.instanceList);
        }
      });
  }
}

export default angular.module('enmAwsdevOpsApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
