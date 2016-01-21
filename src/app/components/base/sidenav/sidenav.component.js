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
      templateUrl: 'app/components/base/sidenav/sidenav.tmpl.html'
    });

  Controller.$inject = ['$state', '$window', 'sideNav'];

  /**
   * Controller for sidenav component.
   * @name Controller
   * @memberof appSidenav
   * @param {Object} $state - to change ui-router state.
   * @param {Object} $window - to get intial size.
   * @param {Object} sideNav - to control open/close of sidenav.
   */
  function Controller($state, $window, sideNav) {
    var vm = this;

    /** Controller fields */
    vm.sidenav = sideNav;

    /** Controller methods */
    vm.changeState = changeState;
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
     * Change ui-router state
     * @param {string} state - state to redirect 
     */
    function changeState(state) {
      $state.go(state);
      
      // check if close sidenav (mobile)
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