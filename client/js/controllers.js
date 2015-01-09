admin.controller('ApCtrl', function($rootScope, $scope, apsFactory) {
	$scope.aps = [];
	$scope.isEditable = [];
	// get all Aps on Load
	apsFactory.getAp().then(function(data) {
		$scope.aps = data.data;
	});
	// Save a Ap to the server
	$scope.save = function($event) {
		if ($event.which == 13 && $scope.apInput) {
			apsFactory.saveAp({
				"ssid": $scope.apInput,
			}).then(function(data) {
				$scope.aps.push(data.data);
			});
			$scope.apInput = '';
		}
	};
	// Update the edited Ap
	$scope.edit = function($event, i) {
		if ($event.which == 13 && $event.target.value.trim()) {
			var _t = $scope.aps[i];
			apsFactory.updateAp({
				_id: _t._id,
				ssid: $event.target.value.trim(),
			}).then(function(data) {
				if (data.data.updatedExisting) {
					_t.ssid = $event.target.value.trim();
					$scope.isEditable[i] = false;
				} else {
					alert('Oops something went wrong!');
				}
			});
		}
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
