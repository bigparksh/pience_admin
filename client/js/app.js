admin = angular.module('admin', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
    .when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'LoginCtrl'
    }).when('/', {
      templateUrl: '/partials/ap.html',
      controller: 'ApCtrl'
	  }).otherwise({
        redirectTo: '/'
      });
}).constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  }).service('Session', function () {
    this.create = function (sessionId, userId, userRole) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
    };
    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
    };
    return this;
  });
