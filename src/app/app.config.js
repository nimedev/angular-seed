/** config component for angular-seed module. */
(function () {
  'use strict';

  angular
    .module('angular-seed')
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
