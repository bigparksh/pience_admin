admin.controller('ApCtrl', function($rootScope, $scope, apsFactory, authService) {
	$scope.aps = [];
	$scope.isEditable = [];

  $scope.credentials = {
    username: '',
    password: ''
  };
	// get all Aps on Load
	apsFactory.getAp().then(function(res) {
		$scope.aps = JSON.parse(res.data).results;
	});

	// Save a Ap to the server
	$scope.save = function() {
		if ($scope.ssid && $scope.password && $scope.address) {
			apsFactory.saveAp({
				"ssid": $scope.ssid,
				"bssid": $scope.bssid,
				"password": $scope.password,
				"address": $scope.address,
				"objectId": $scope.objectId,
				"userId": $scope.currentUser.objectId
			}).then(function(res) {
				$scope.aps = JSON.parse(res.data).results;
			});
			$scope.ssid= null;
			$scope.bssid= null;
			$scope.password = null; 
			$scope.address = null; 
			$scope.apInput = '';
		} else {
			alert('Please put valid value');
		}
	};

	// Update the edited Ap
	$scope.edit = function(i) {
			apsFactory.updateAp({
				objectId: $scope.aps[i].objectId,
				ssid: $scope.aps[i].ssid,
				bssid: $scope.aps[i].bssid,
				password: $scope.aps[i].password,
				address: $scope.aps[i].address
			}).then(function(res) {
        $scope.isEditable[i] = false;
        $scope.aps[i].longitude = res.data.longitude;
        $scope.aps[i].latitude = res.data.latitude;
			});
	};

	// Delete a Ap
	$scope.delete = function(i) {
		apsFactory.deleteAp($scope.aps[i].objectId).then(function(res) {
        $scope.aps = JSON.parse(res.data).results;
		});
	};

});

admin.controller('ApplicationCtrl', function($scope, authService) {
  $scope.currentUser = null;
  $scope.isAuthorized = authService.isAuthorized;
  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };
});

admin.controller('LoginCtrl', function($scope, authService) {
  $scope.currentUser = null;

  $scope.login = function (credentials) {
    authService.login(credentials).then(function (user) {
      if(user.sessionToken)
        $scope.setCurrentUser(user);
    });
  };

});

admin.controller('LogoutCtrl', function($scope, authService) {
  $scope.logout = function() {
    authService.logout();
  };
});
