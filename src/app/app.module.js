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
      'ngSanitize',

    // Comunity modules
      'ui.router',
    
    // Components
      'base',
      
    // Views components
      'configuration',
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
  config.$inject = ['$urlRouterProvider'];

  function config($urlRouterProvider) {
    // Redirect path to * urls
    $urlRouterProvider.otherwise('/');
  }
})();
