/** @module configuration */
(function () {
  'use strict';
  var moduleName = 'configuration';

  angular
    .module(moduleName, ['ui.router'])
    .config(config);
  
  /** Config function */
  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    // Help view
    $stateProvider
      .state(moduleName, {
        url: '/configuration',
        template: '<configuration-view></configuration-view>'
      });
  }
})();