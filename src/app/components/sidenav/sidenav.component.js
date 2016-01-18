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

  Controller.$inject = ['$window', 'sideNav'];

  /**
   * controller for sidenav component.
   * @name Controller
   * @memberof appSidenav
   * @param {Object} $window - to get intial size.
   * @param {Object} sideNav - to control open/close of sidenav.
   */
  function Controller($window, sideNav) {
    var vm = this;

    /** controller fields */
    vm.sidenav = sideNav;

    /** controller methods */
    vm.toggle = toggle;

    activate();

    ////////////
    /** init function */
    function activate() {
      // check 
      if($window.innerWidth >= 960) {
        sideNav.closed = false;
      }
    }
    
    /** toggle sidenav */
    function toggle() {
      sideNav.toggle();
    }
  }
})();