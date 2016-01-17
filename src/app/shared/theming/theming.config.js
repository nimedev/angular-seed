/** config component for theming module. */
(function () {
  'use strict';

  angular
    .module('theming')
    .config(config);

  config.$inject = ['$mdIconProvider', '$mdThemingProvider'];

  /**
   * settings for theming module.
   * @name config
   * @memberof theming
   * @param {Object} $mdIconProvider - to load app icons.
   * @param {Object} $mdThemingProvider - to setup angular-material themes.
   */
  function config($mdIconProvider, $mdThemingProvider) {
    // Iconos
    $mdIconProvider
    // Black 24px
      // .icon('account-box-b24', '../assets/img/icons/b24/account_box.svg', 24)
      // .icon('arrow-drop-down-b24', '../assets/img/icons/b24/arrow_drop_down.svg', 24)
      // .icon('assignment-turned-in-b24', '../assets/img/icons/b24/assignment_turned_in.svg', 24)
      // .icon('block-b24', '../assets/img/icons/b24/block.svg', 24)
      // .icon('cake-b24', '../assets/img/icons/b24/cake.svg', 24)
      // .icon('close-b24', '../assets/img/icons/b24/close.svg', 24)
      // .icon('delete-b24', '../assets/img/icons/b24/delete.svg', 24)
      // .icon('done-all-b24', '../assets/img/icons/b24/done_all.svg', 24)
      // .icon('edit-b24', '../assets/img/icons/b24/edit.svg', 24)
      // .icon('email-b24', '../assets/img/icons/b24/email.svg', 24)
      // .icon('exit-to-app-b24', '../assets/img/icons/b24/exit_to_app.svg', 24)
      // .icon('language-b24', '../assets/img/icons/b24/language.svg', 24)
      // .icon('lock-b24', '../assets/img/icons/b24/lock.svg', 24)
      // .icon('phone-b24', '../assets/img/icons/b24/phone.svg', 24)
      // .icon('today-b24', '../assets/img/icons/b24/today.svg', 24)
    // Black 48px
      // .icon('arrow-back-b48', '../assets/img/icons/b48/arrow_back.svg', 24)
      // .icon('warning-b48', '../assets/img/icons/b48/warning.svg', 24)
    // White 24px
      // .icon('arrow-drop-down-w24', '../assets/img/icons/w24/arrow_drop_down.svg', 24)
      // .icon('delete-w24', '../assets/img/icons/w24/delete.svg', 24)
    // White 48px
      // .icon('account-w48', '../assets/img/icons/w48/account.svg', 48)
      // .icon('add-w48', '../assets/img/icons/w48/add.svg', 48)
      // .icon('add-a-photo-w48', '../assets/img/icons/w48/add_a_photo.svg', 48)
      // .icon('collections-w48', '../assets/img/icons/w48/collections.svg', 48)
      // .icon('edit-w48', '../assets/img/icons/w48/edit.svg', 48)
      // .icon('file-upload-w48', '../assets/img/icons/w48/file_upload.svg', 48)
      // .icon('input-w48', '../assets/img/icons/w48/input.svg', 48)
      // .icon('insert-photo-w48', '../assets/img/icons/w48/insert_photo.svg', 48)
      // .icon('language-w48', '../assets/img/icons/w48/language.svg', 48)
      // .icon('list-w48', '../assets/img/icons/w48/list.svg', 48)
      .icon('menu-w48', '../assets/img/icons/w48/menu.svg', 48);
      // .icon('more-vert-w48', '../assets/img/icons/w48/more_vert.svg', 48);

    // angular-material Theming
    $mdThemingProvider.theme('default')
    /** default: 500, hue-1: 300, hue-2: 800, hue-3: A100 */
      .primaryPalette('blue')
      .accentPalette('deep-orange');
  }
})();
