/** @module app */
(function () {
  'use strict';

  angular
    .module('angular-seed', [
    // angular modules
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngSanitize',

    // comunity modules

    // components
      'header',
      'sidenav',

    // shared components
      'i18n',
      'route',
      'theming',
      
    // template module is added with gulp task scritps
      'templates'
    ])
    .config(config);

  config.$inject = ['$locationProvider'];

  /**
   * Settings for angular-seed module.
   * @name config
   * @memberof angular-seed
   * @param {Object} $locationProvider - to friendly html.
   */
  function config($locationProvider) {
    // get rid of the hash in the URL
    $locationProvider.html5Mode(true);
  }
})();
