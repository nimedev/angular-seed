/** langList component. */
(function () {
  'use strict';

  /**
   * List of available lenguage.
   * @namespace langList
   */
  angular
    .module('header')
    .component('langList', {
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'E',
      templateUrl: 'app/components/header/lang-list/lang-list.tmpl.html'
    });

  Controller.$inject = ['$translate'];

  /**
   * Controller for list of available languages.
   * @name Controller
   * @param {Object} $translate - to change language in runtime.
   */
  function Controller($translate) {
    var vm = this;

    /** controller fields */
    vm.languages = ['en', 'es'];

    /** controller methods */
    vm.changeLanguage = changeLanguage;

    activate();

    ///////////
    /** Init function. */
    function activate() {

    }

    /**
     * Change language in runtime.
     * @memberof LangCtrl
     */
    function changeLanguage(langKey) {
      $translate.use(langKey);
    }
  }
})();
