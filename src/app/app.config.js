/** config component for angular-seed module. */
(function () {
  'use strict';

  angular
    .module('angular-seed')
    .config(config);

  config.$inject = ['constants', '$locationProvider', '$translateProvider'];

  /**
   * settings for angular-seed module.
   * @name config
   * @memberof angular-seed
   * @param {Object} constants to get debug mode.
   * @param {Object} $locationProvider - to friendly html.
   * @param {Object} $translateProvider - to angular-translate settings.
   */
  function config(constants, $locationProvider, $translateProvider) {
    // get rid of the hash in the URL
    $locationProvider.html5Mode(true);

    // angular-translate configuration
    $translateProvider.translations('en', defaultLanguage);
    $translateProvider.useStaticFilesLoader({
      prefix: 'app/i18n/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    $translateProvider.useLocalStorage();
    // $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.useSanitizeValueStrategy('escape');
    // if (constants.DEBUG) {
    //   $translateProvider.useMissingTranslationHandlerLog();
    // }
  }
})();
