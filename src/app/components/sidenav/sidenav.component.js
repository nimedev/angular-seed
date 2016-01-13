/** appSidenav component */
(function () {
  'use strict';
  
  /**
   * component for sidenav
   * @name appSidenav
   * @memberof sidenav
   */
  angular
    .module('sidenav')
    .component('appSidenav', {
      restrict: 'A',
      templateUrl: 'app/components/sidenav/sidenav.tmpl.html'
    });
})();