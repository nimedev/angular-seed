/**
 * Component for side navigation menu
 * @name configSidenav
 * @memberof sidenav
 */
(function () {
  'use strict';

  angular
    .module('sidenav')
    .component('configSidenav', {
      controller: Controller,
      templateUrl: 'app/components/base/sidenav/config-sidenav/config-sidenav.tmpl.html'
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