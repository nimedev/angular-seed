/**
 * Service to control sidenav component.
 * @name sideNav
 * @memberof sidenav
 */
(function () {
  'use strict';

  angular
    .module('sidenav')
    .service('sideNav', Service);

  Service.$inject = [];

  function Service() {
    var className = 'nav-open';

    var vm = this;

    // service fields
    vm.cssClass = '';
    vm.smBreak = 600;
    vm.mdBreak = 960;
      
    // service methods
    vm.close = close;
    vm.open = open;
    vm.toggle = toggle;

    ///////////////
    /** Close sidenav */
    function close() {
      vm.cssClass = '';
      toggleElements();
    }
    
    /** Open sidenav */
    function open() {
      vm.cssClass = className;
      toggleElements();
    }
    
    /** Change sidenav visibility */
    function toggle() {
      if (vm.cssClass === '') {
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
      if (vm.cssClass === '') {
        body.removeClass(className);
        element.removeClass(className);
      } else {
        body.addClass(className);
        element.addClass(className);
      }
    }
  }
})();