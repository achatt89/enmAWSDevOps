'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/main', {
    template: '<main></main>'
  });
}
