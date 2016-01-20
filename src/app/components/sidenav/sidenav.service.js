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
      toggleAppContent();
    }
    
    /** Open sidenav */
    function open() {
      service.closed = false;
      toggleAppContent();
    }
    
    /** Change sidenav visibility */
    function toggle() {
      service.closed = !service.closed;
      toggleAppContent();
    }
    
    /** HELPER FUNCTIONS */
    /** toggle class in .app-content element */
    function toggleAppContent() {
      var body = angular.element(document).find('body');
      var element = angular.element(document.querySelector('.app-content'));
      if (service.closed) {
        element.removeClass('nav-open');
        element.addClass('nav-closed');
        body.removeClass('nav-open');
      } else {
        element.removeClass('nav-closed');
        element.addClass('nav-open');
        body.addClass('nav-open');
      }
    }
  }
})();