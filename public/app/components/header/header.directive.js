/** appHeader directive */
(function() {
  'use strict';

  angular
    .module('header')
    .directive('appHeader', directive);

  /**
   * header directive
   * @name appHeader
   * @memberof header
   */
  function directive() {
    var directive = {
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'A',
      scope: {},
      templateUrl: 'app/components/header/header.tmpl.html'
    };

    return directive;

    /////////////////
  }

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
