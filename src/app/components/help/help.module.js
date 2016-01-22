/** @module help */
(function () {
  'use strict';
  var moduleName = 'help';

  angular
    .module(moduleName, ['ui.router'])
    .config(config);
  
  /** Config function */
  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    // Help view
    $stateProvider
      .state(moduleName, {
        url: '/help',
        views: {
          'sidenav': {
            template: '<home-sidenav></home-sidenav>'
          },
          'app-content': {
            template: '<app-help-view></app-help-view>'
          }
        }
      });
  }
})();