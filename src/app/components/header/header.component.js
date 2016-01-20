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

  Controller.$inject = ['headerNav', 'sideNav'];

  /**
   * controller for header component.
   * @name Controller
   * @memberof appHeader
   * @param {Object} headerNav - to toggle header-nav visibility.
   * @param {Object} sideNav - to toggle sidenav visibility.
   */
  function Controller(headerNav, sideNav) {
    var vm = this;

    /** controller fields */
    vm.headerNav = headerNav;

    /** controller methods */
    vm.toggleHeaderNav = toggleHeaderNav;
    vm.toggleSidenav = toggleSidenav;

    activate();

    ////////////
    /** init function */
    function activate() {

    }
    
    /** toggle header nav visibility */
    function toggleHeaderNav() {
      headerNav.toggle();
    }
    
    /** toggle sidenav visibility */
    function toggleSidenav() {
      sideNav.toggle();
    }
  }
})();
