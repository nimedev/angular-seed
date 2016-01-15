/* global defaultLanguage */
/** config component for i18n module. */
(function () {
  'use strict';

  angular
    .module('angular-seed')
    .config(config);

  config.$inject = ['$translateProvider'];

  /**
   * Settings for i18n module.
   * @name config
   * @memberof i18n
   * @param {Object} $translateProvider - to angular-translate settings.
   */
  function config($translateProvider) {
    // angular-translate configuration
    
    $translateProvider.translations('en', defaultLanguage);
    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/i18n/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('escape');
    
    //   $translateProvider.useMissingTranslationHandlerLog();
    // }
  }
})();
