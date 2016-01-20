/**
 * Main module
 * @module 'angular-seed' 
 */
(function () {
  'use strict';
  
  /** Constants object */
  var constants = {
    // server base url
    REST_URL: '',

    // Debug mode
    DEBUG: true
  };

  angular
    .module('angular-seed', [
    // Angular modules
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngRoute',
      'ngSanitize',

    // Comunity modules

    // Components
      'base',
      
    // Views components
      'help',
      'home',

    // Shared components
      'i18n',
      'theming',
      
    // Template module is added with gulp task scritps
      'templates'
    ])
    .config(config)
    .constant('constants', constants);
    
    
  /** Config function */
  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    // Redirect path to * urls
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }
})();
