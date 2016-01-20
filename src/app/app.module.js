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
    ]);
})();
