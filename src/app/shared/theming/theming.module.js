/** @module theming */
(function () {
  'use strict';

  angular
    .module('theming', ['ngMaterial'])
    .config(config);

  config.$inject = ['$mdIconProvider', '$mdThemingProvider'];

  /**
   * Settings for theming module.
   * @name config
   * @memberof theming
   * @param {Object} $mdIconProvider - to load app icons.
   * @param {Object} $mdThemingProvider - to setup angular-material themes.
   */
  function config($mdIconProvider, $mdThemingProvider) {
    // angular-material Theming
    $mdThemingProvider.theme('default')
    /** default: 500, hue-1: 300, hue-2: 800, hue-3: A100 */
      .primaryPalette('grey')
      .accentPalette('deep-orange');
  }
})();
