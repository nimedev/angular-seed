/** appSidenav component */
(function () {
  'use strict';
  
  /**
   * Component for sidenav
   * @name appSidenav
   * @memberof sidenav
   */
  angular
    .module('sidenav')
    .component('appSidenav', {
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'A',
      templateUrl: 'app/components/base/sidenav/sidenav.tmpl.html'
    });

  Controller.$inject = ['$location', '$window', 'sideNav'];

  /**
   * Controller for sidenav component.
   * @name Controller
   * @memberof appSidenav
   * @param {Object} $location - to redirect.
   * @param {Object} $window - to get intial size.
   * @param {Object} sideNav - to control open/close of sidenav.
   */
  function Controller($location, $window, sideNav) {
    var vm = this;

    /** Controller fields */
    vm.sidenav = sideNav;

    /** Controller methods */
    vm.goToLink = goToLink;
    vm.toggle = toggle;

    activate();

    ////////////
    /** Init function */
    function activate() {
      // Open sidenav for large screens
      if ($window.innerWidth >= sideNav.mdBreak) {
        sideNav.open();
      }
    }
    
    /**
     * Go to link
     * @param {string} path - path to redirect 
     */
    function goToLink(path) {
      if (path) {
        $location.path(path);
      }
      if ($window.innerWidth < sideNav.smBreak) {
        sideNav.close();
      }
    }
    
    /** Toggle sidenav */
    function toggle() {
      sideNav.toggle();
    }
  }
})();