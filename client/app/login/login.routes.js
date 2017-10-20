'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      template: '<login></login>'
    });
}
