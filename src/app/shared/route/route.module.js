/** @module route */
(function () {
  'use strict';

  angular
    .module('route', ['ngRoute'])
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
   * settings for routes module.
   * @name config
   * @memberof route
   * @param {Object} $routeProvider - to ...
   */
  function config($routeProvider) {

    // app routes that not have own module
    $routeProvider
    // home view
      .when('/', {
        template: '<app-home-view></app-home-view>'
      })
    // about view
      .when('/about', {
        template: '<app-about-view></app-about-view>'
      })
    // redirect path
      .otherwise({
        redirectTo: '/'
      });
  }
})();
