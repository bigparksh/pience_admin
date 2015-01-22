admin.factory('apsFactory', function($http) {
	var urlBase = '/aps';
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

admin.factory('userFactory', function($http) {
  var _userService = {};

  _userService.login = function(credentials) {
    return $http.post('/login', credentials);
  };

  _userService.logout = function() {
    return $http.post('/logout');
  };

  return _userService;
});
