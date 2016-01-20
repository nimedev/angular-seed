/** headerNav factory */
(function () {
  'use strict';

  angular
    .module('header')
    .factory('headerNav', Service);

  Service.$inject = [];
  
  /**
   * Function to control header-nav visibility.
   * @name headerNav
   * @memberof header
   */
  function Service() {
    var className = 'header__nav-open';

    var service = {
      // factory fields
      cssClass: '',
      
      // factory functions
      close: close,
      open: open,
      toggle: toggle
    };

    return service;

    ///////////////
    /** Close header-nav */
    function close() {
      service.cssClass = '';
      toggleElements();
    }
    
    /** Open header-nav */
    function open() {
      service.cssClass = className;
      toggleElements();
    }
    
    /** Change header-nav visibility */
    function toggle() {
      if (service.cssClass === '') {
        open();
      } else {
        close();
      }
    }
    
    /** HELPER FUNCTIONS */
    /** toggle class in .app-body and .app-sidenav elements */
    function toggleElements() {
      var body = angular.element(document.querySelector('.app-body'));
      var sidenav = angular.element(document.querySelector('.app-sidenav'));
      if (service.cssClass === '') {
        body.removeClass(className);
        sidenav.removeClass(className);
      } else {
        body.addClass(className);
        sidenav.addClass(className);
      }
    }
  }
})();