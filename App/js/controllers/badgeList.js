/* 
 * (C) Copyright 2017 CEFRIEL (http://www.cefriel.com/).
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Contributors:
 *     Andrea Fiano, Gloria Re Calegari, Irene Celino.
 */
 
angular.module("gwap")
.controller("badgeListCtrl", function($scope, $http, $routeParams, $location, $cookies, $cookieStore) {

$scope.$emit('load');
$scope.data = {};
$http({
		method  : 'POST',
        url     : 'api/userBadge.php',
		data    : { 'idUser': $cookieStore.get('gwap_idUser')},		
        headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
	})
	.success(function (data) {	
		$scope.data.badgeList = data;
		$scope.badgeList = $scope.data.badgeList;

		angular.forEach($scope.badgeList, function(value, key) {
			if(!value["timestamp"]) {
				value["disabled"] = true;
				value["image"] = value["image"].replace(".png", " BN.png");
			}			
		});
		
		$scope.$emit('unload');
	})
	.error(function (error) {
		$scope.data.error = error;
		$scope.$emit('unload');
	});

});