admin.controller('ApCtrl', function($rootScope, $scope, apsFactory) {
	$scope.aps = [];
	$scope.isEditable = [];
	// get all Aps on Load
	apsFactory.getAp().then(function(res) {
		$scope.aps = JSON.parse(res.data).results;
	});
	// Save a Ap to the server
	$scope.save = function($event) {
		if ($scope.ssid && $scope.password && $scope.address) {
			apsFactory.saveAp({
				"ssid": $scope.ssid,
				"password": $scope.password,
				"address": $scope.address
			}).then(function(data) {
				$scope.aps.push(data.data);
				alert(data);
			});
			$scope.ssid= null;
			$scope.password = null; 
			$scope.address = null; 
			$scope.apInput = '';
		} else {
			alert('Please put valid value');
		}
	};
	// Update the edited Ap
	$scope.edit = function($event, i) {
			var _t = $scope.aps[i];
			apsFactory.updateAp({
				_id: _t._id,
				ssid: $scope.aps[i].ssid,
				password: $scope.aps[i].password,
				address: $scope.aps[i].address
			}).then(function(data) {
				if (data.data.updatedExisting) {
					$scope.isEditable[i] = false;
					_t.ssid = $scope.aps[i].ssid;
					_t.password = $scope.aps[i].password;
					_t.address = $scope.aps[i].address;
				} else {
					alert('Oops something went wrong!');
				}
			});
	};
	// Delete a Ap
	$scope.delete = function(i) {
		apsFactory.deleteAp($scope.aps[i]._id).then(function(data) {
			if (data.data) {
				$scope.aps.splice(i, 1);
			}
		});
	};
});
