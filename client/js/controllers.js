admin.controller('ApCtrl', function($rootScope, $scope, apsFactory) {
	$scope.aps = [];
	$scope.isEditable = [];


	// get all Aps on Load

  $scope.get_aps = function() {
    $scope.credentials = {
      username: '',
      password: ''
    };

    apsFactory.getAp().then(function (res) {
      var data = JSON.parse(res.data);
      if (data) {
        $scope.currentUser = data.session;
        $scope.aps = data.results;
      } else {
        $scope.aps = null;
      }
    });
  };


  // Save a Ap to the server
	$scope.save = function() {
		if ($scope.ssid && $scope.password && $scope.address) {
			apsFactory.saveAp({
				"ssid": $scope.ssid,
				"bssid": $scope.bssid,
				"password": $scope.password,
				"address": $scope.address,
				"objectId": $scope.objectId
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

  $scope.get_aps();

});

admin.controller('UserCtrl', function($rootScope, $scope, userFactory) {
  $scope.login = function (credentials) {
    userFactory.login(credentials).then(function() {
      $scope.get_aps();
    });
  };

  $scope.logout = function () {
    userFactory.logout().then(function() {
      $scope.get_aps();
    });
  };
});