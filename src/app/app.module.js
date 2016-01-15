/** @module app */
(function() {
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
      'pascalprecht.translate',

      // components
      'header',
      'sidenav',

      // shared components
      'route',
      
      // template module is added with gulp task scritps
      'templates'
    ]);
})();
