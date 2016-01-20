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
    var className = 'nav-open';
    
    var service = {
      // factory fields
      cssClass: '',
      smBreak: 600,
      mdBreak: 960,
      
      // factory functions
      close: close,
      open: open,
      toggle: toggle
    };

    return service;

    ///////////////
    /** Close sidenav */
    function close() {
      service.cssClass = '';
      toggleElements();
    }
    
    /** Open sidenav */
    function open() {
      service.cssClass = className;
      toggleElements();
    }
    
    /** Change sidenav visibility */
    function toggle() {
      if (service.cssClass === '') {
        open();
      } else {
        close();
      }
    }
    
    /** HELPER FUNCTIONS */
    /** toggle class in body and .app-body elements */
    function toggleElements() {
      var body = angular.element(document).find('body');
      var element = angular.element(document.querySelector('.app-body'));
      
      // sidenav is closed?
      if (service.cssClass === '') {
        body.removeClass(className);
        element.removeClass(className);
      } else {
        body.addClass(className);
        element.addClass(className);
      }
    }
  }
})();