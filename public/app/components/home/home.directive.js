/** appHomeView directive */
(function() {
  'use strict';

  angular
    .module('angular-seed')
    .directive('appHomeView', directive);

  /**
   * directive for home view
   * @name appHomeView
   * @memberof angular-seed
   */
  function directive() {
    var directive = {
      restrict: 'E',
      scope: {},
      templateUrl: 'app/components/home/home.tmpl.html'
    };

    return directive;

    /////////////////
  }
})();
