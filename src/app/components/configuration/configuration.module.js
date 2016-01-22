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
        views: {
          'sidenav': {
            template: '<config-sidenav></config-sidenav>'
          },
          'app-content': {
            template: '<configuration-view></configuration-view>'
          }
        }
      });
  }
})();