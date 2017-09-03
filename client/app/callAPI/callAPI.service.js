'use strict';
const angular = require('angular');

/*@ngInject*/
export function callAPIService($http) {
  // return $http.get('http://localhost:3000/api/listAllInstances/')
  //   .then(function())
}

export default angular.module('callAPI', [])
  .service('callAPI', callAPIService)
  .name;
