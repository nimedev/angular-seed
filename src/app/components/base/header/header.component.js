/** appHeader component */
(function () {
  'use strict';

  /**
   * Header component
   * @name appHeader
   * @memberof header
   */
  angular
    .module('header')
    .component('appHeader', {
      controller: Controller,
      controllerAs: 'vm',
      templateUrl: 'app/components/base/header/header.tmpl.html'
    });

  Controller.$inject = ['headerNav', 'sideNav'];

  /**
   * Controller for header component.
   * @name Controller
   * @memberof appHeader
   * @param {Object} headerNav - to toggle header-nav visibility.
   * @param {Object} sideNav - to toggle sidenav visibility.
   */
  function Controller(headerNav, sideNav) {
    var vm = this;

    /** Controller fields */
    vm.headerNav = headerNav;

    /** Controller methods */
    vm.toggleHeaderNav = toggleHeaderNav;
    vm.toggleSidenav = toggleSidenav;

    activate();

    ////////////
    /** Init function */
    function activate() {

    }
    
    /** Toggle header nav visibility */
    function toggleHeaderNav() {
      headerNav.toggle();
    }
    
    /** Toggle sidenav visibility */
    function toggleSidenav() {
      sideNav.toggle();
    }
  }
})();
