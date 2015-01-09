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
