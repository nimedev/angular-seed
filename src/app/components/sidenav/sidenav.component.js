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
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'A',
      templateUrl: 'app/components/sidenav/sidenav.tmpl.html'
    });

  Controller.$inject = ['$location', '$window', 'sideNav'];

  /**
   * controller for sidenav component.
   * @name Controller
   * @memberof appSidenav
   * @param {Object} $location - to redirect.
   * @param {Object} $window - to get intial size.
   * @param {Object} sideNav - to control open/close of sidenav.
   */
  function Controller($location, $window, sideNav) {
    var vm = this;

    /** controller fields */
    vm.sidenav = sideNav;

    /** controller methods */
    vm.goToLink = goToLink;
    vm.toggle = toggle;

    activate();

    ////////////
    /** Init function */
    function activate() {
      // check 
      if ($window.innerWidth >= sideNav.mdBreak) {
        sideNav.closed = false;
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