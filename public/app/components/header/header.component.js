/** appHeader component */
(function() {
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

  Controller.$inject = ['$location'];

  /**
   * controller for header directive.
   * @name Controller
   * @memberof appHeader
   * @param {Object} $location - to redirect to another link.
   */
  function Controller($location) {
    var vm = this;

    /** controller fields */

    /** controller methods */

    activate();

    ////////////
    /** init function */
    function activate() {

    }
  }
})();
