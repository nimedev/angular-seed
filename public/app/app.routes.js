'use strict';

angular.module('app.routes', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
      // route for the landing page
        .when('/', {
          templateUrl: 'app/components/home/homeView.html'
        })
        .otherwise({
          redirectTo: '/'
        });

      // get rid of the hash in the URL
      $locationProvider.html5Mode(true);
    }
  ]);
