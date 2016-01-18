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

  Controller.$inject = ['sideNav'];

  /**
   * controller for sidenav component.
   * @name Controller
   * @memberof appSidenav
   * @param {Object} sideNav - to control open/close of sidenav.
   */
  function Controller(sideNav) {
    var vm = this;

    /** controller fields */
    vm.sidenav = sideNav;

    /** controller methods */
    vm.toggle = toggle;

    activate();

    ////////////
    /** init function */
    function activate() {

    }
    
    /** toggle sidenav */
    function toggle() {
      sideNav.toggle();
    }
  }
})();