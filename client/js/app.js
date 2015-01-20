admin = angular.module('admin', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
    .when('/', {
      templateUrl: '/partials/ap.html',
      controller: 'ApplicationCtrl'
	  }).otherwise({
        redirectTo: '/'
      });
});
admin.service('Session', function () {
  this.create = function (sessionId, userId) {
    this.id = sessionId;
    this.userId = userId;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
  };

  return this;
});

admin.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})