/** appHelpView component */
(function () {
  'use strict';
  
  /**
   * Component for about view
   * @name appHelpView
   * @memberof help
   */
  angular
    .module('help')
    .component('appHelpView', {
      restrict: 'E',
      templateUrl: 'app/components/help/help.tmpl.html'
    });
})();