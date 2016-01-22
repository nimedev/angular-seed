/**
 * Component for side navigation menu
 * @name homeSidenav
 * @memberof sidenav
 */
(function () {
  'use strict';

  angular
    .module('sidenav')
    .component('homeSidenav', {
      controller: Controller,
      templateUrl: 'app/components/base/sidenav/home-sidenav/home-sidenav.tmpl.html'
    });

  Controller.$inject = ['sideNav'];

  /**
   * Controller for home-sidenav component.
   * @name Controller
   * @memberof appSidenav
   * @param {Object} sideNav - to control open/close of sidenav.
   */
  function Controller(sideNav) {
    var vm = this;

    /** Controller fields */

    /** Controller methods */
    vm.changeState = sideNav.changeState;

    activate();

    ////////////
    /** Init function */
    function activate() {

    }
  }
})();