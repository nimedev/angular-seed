/**
 * Component for coming soon message
 * @name comingSoon
 * @memberof base
 */
(function () {
  'use strict';

  angular
    .module('base')
    .component('comingSoon', {
      bindings: {
        title: '@'
      },
      templateUrl: 'app/components/base/coming-soon/coming-soon.tmpl.html'
    });
})();
