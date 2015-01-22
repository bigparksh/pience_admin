admin = angular.module('admin', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
    .when('/', {
      templateUrl: '/partials/ap.html',
      controller: 'ApCtrl'
	  }).otherwise({
        redirectTo: '/'
      });
  });