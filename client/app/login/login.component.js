'use strict';
// import angular from 'angular';
const angular = require('angular');
const ngRoute = require('angular-route');
const sha256 = require('js-sha256');


import routes from './login.routes';

export class LoginComponent {
  $http;
  $location;

  /*@ngInject*/
  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
  }

  $onInit() {
    this.login = () => {
      console.log('tada');
      this.$http({
        method: 'PUT',
        url: 'api/logins',
        transformResponse: response => response,
        data: {
          username: sha256(this.loginForm.username),
          password: sha256(this.loginForm.password)
        }
      })
        .then(response => {
          if (response.data === 'success') {
            this.loginError = false;
            this.$location.path('/main');
          } else {
            this.loginError = true;
          }
        });
    };

    this.reset = () => {
      this.loginForm = {};
    };
  }
}

export default angular.module('enmAwsdevOpsApp.login', [ngRoute])
  .config(routes)
  .component('login', {
    template: require('./login.html'),
    controller: LoginComponent,
  })
  .name;
