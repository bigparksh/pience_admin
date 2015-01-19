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
}).factory('AuthService', function ($http, Session) {
  var authService = {};

  authService.login = function (credentials) {
    return $http
      .get('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
          res.data.user.role);
        return res.data.user;
      });
  };

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  return authService;
});
