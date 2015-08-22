'use strict';

var app = angular.module('my-angular-seed', [
  // angular modules
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'app.routes',
  'ngSanitize',
  'ngTouch',
  // comunity modules
  'ngMaterial',
  'pascalprecht.translate'
  // components
  // ...
  // shared components
  // ...
]);

// application configuration to integrate token into requests
app.config(['$translateProvider', 'CONSTANTS',
  function($translateProvider, con) {

    // angular-translate configuration
    $translateProvider.translations('es', translationsES);
    $translateProvider.useStaticFilesLoader({
      prefix: 'app/i18n/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('es');
    $translateProvider.fallbackLanguage('es');
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('sanitize');
    if (con.DEBUG) {
      $translateProvider.useMissingTranslationHandlerLog();
    }

    // satellizer configuration

    // http interceptor

  }
]);

// application CONSTANTS
app.constant('CONSTANTS', {
  // server base url
  REST_URL: 'http://localhost:8080',
  // Debug mode
  DEBUG: true
});
