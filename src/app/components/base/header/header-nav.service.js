/**
 * Service to control header-nav visibility.
 * @name headerNav
 * @memberof header
 */
(function () {
  'use strict';

  angular
    .module('header')
    .service('headerNav', Service);

  Service.$inject = [];

  function Service() {
    var className = 'header__nav-open';

    var vm = this;

    // service fields
    vm.cssClass = '';
      
    // service methods
    vm.close= close;
    vm.open= open;
    vm.toggle = toggle;

    ///////////////
    /** Close header-nav */
    function close() {
      vm.cssClass = '';
      toggleElements();
    }
    
    /** Open header-nav */
    function open() {
      vm.cssClass = className;
      toggleElements();
    }
    
    /** Change header-nav visibility */
    function toggle() {
      if (vm.cssClass === '') {
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
      
      // header-nav is closed?
      if (vm.cssClass === '') {
        body.removeClass(className);
        sidenav.removeClass(className);
      } else {
        body.addClass(className);
        sidenav.addClass(className);
      }
    }
  }
})();