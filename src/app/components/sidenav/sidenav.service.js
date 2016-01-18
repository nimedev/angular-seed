/** sideNav factory */
(function () {
  'use strict';

  angular
    .module('sidenav')
    .factory('sideNav', Service);

  Service.$inject = [];
  
  /**
   * function to control sidenav component.
   * @name sideNav
   * @memberof sidenav
   */
  function Service() {
    var service = {
      // factory fields
      closed: true,
      
      // factory functions
      toggle: toggle
    };

    return service;

    ///////////////
    /** change sidenav visibility */
    function toggle() {
      service.closed = !service.closed;
    }
  }
})();