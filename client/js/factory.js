admin.factory('apsFactory', function($http) {
	var urlBase = '/api/aps';
	var _apService = {};

	_apService.getAp = function() {
    return $http.get(urlBase);
	};

	_apService.saveAp = function(ap) {
			return $http.post(urlBase, ap);
	};

	_apService.updateAp = function(ap) {
			return $http.put(urlBase, ap);
	};

	_apService.deleteAp = function(id) {
			return $http.delete(urlBase + '/' + id);
	};

	return _apService;
});
admin.factory('authService', function ($http, Session) {
  var authService = {};

  authService.login = function (credentials) {
    return $http
    .post('/login?', credentials)
      .then(function (res) {
        var user = JSON.parse(res.data);
        Session.create(user.sessionToken, user.username);
        return user;
      });
  };

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  authService.isAuthorized = function () {
    return authService.isAuthenticated();
  };

  authService.logout = function() {
    return Session.destroy();
  };

  return authService;
});

admin.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

admin.factory('AuthInterceptor', function ($rootScope, $q,
                                            AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
})