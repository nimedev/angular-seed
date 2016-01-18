/** appHeader component */
(function () {
  'use strict';

  /**
   * header directive
   * @name appHeader
   * @memberof header
   */
  angular
    .module('header')
    .component('appHeader', {
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'A',
      templateUrl: 'app/components/header/header.tmpl.html'
    });

  Controller.$inject = ['sideNav'];

  /**
   * controller for header component.
   * @name Controller
   * @memberof appHeader
   * @param {Object} sideNav - to toggle sidenav visibility.
   */
  function Controller(sideNav) {
    var vm = this;

    /** controller fields */

    /** controller methods */
    vm.toggleSidenav = toggleSidenav;

    activate();

    ////////////
    /** init function */
    function activate() {

    }
    
    /** toggle sidenav visibility */
    function toggleSidenav() {
      sideNav.toggle();
    }
  }
})();
