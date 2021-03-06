/** @module home */
(function () {
  'use strict';
  var moduleName = 'home';

  angular
    .module(moduleName, ['ui.router'])
    .config(config);
    
  /** Config function */
  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    // Help view
    $stateProvider
      .state(moduleName, {
        url: '/',
        views: {
          'sidenav': {
            template: '<home-sidenav></home-sidenav>'
          },
          'app-content': {
            template: '<app-home-view></app-home-view>'
          }
        }
      });
  }
})();