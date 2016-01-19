/** sideNav factory */
(function () {
  'use strict';

  angular
    .module('sidenav')
    .factory('sideNav', Service);

  Service.$inject = [];
  
  /**
   * Function to control sidenav component.
   * @name sideNav
   * @memberof sidenav
   */
  function Service() {
    var service = {
      // factory fields
      smBreak: 600,
      mdBreak: 960,
      closed: true,
      
      // factory functions
      close: close,
      open: open,
      toggle: toggle
    };

    return service;

    ///////////////
    /** Close sidenav */
    function close() {
      service.closed = true;
    }
    
    /** open sidenav */
    function open() {
      service.closed = false;
    }
    
    /** Change sidenav visibility */
    function toggle() {
      service.closed = !service.closed;
    }
  }
})();