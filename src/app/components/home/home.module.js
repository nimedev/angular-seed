/** @module home */
(function () {
  'use strict';

  angular
    .module('home', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      // Home view
      $routeProvider.when('/', {
        template: '<app-home-view></app-home-view>'
      });
    }]);
})();