/** @module help */
(function () {
  'use strict';

  angular
    .module('help', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      // Help view
      $routeProvider.when('/help', {
        template: '<app-help-view></app-help-view>'
      });
    }]);
})();