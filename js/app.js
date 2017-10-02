(function() {
	'use strict';
		var app = angular.module("stormbloodApp", []);

		app.controller("stormbloodCtrl", ["$scope", "$http", function($scope, $http){
		
		$scope.items = {};

		$scope.titles = {};

		$scope.activeTitle;
		$scope.activeJob;

		$http ({
			method: 'GET',
			url: "js/sessions.json"
		}).then(function successCallback(data, status, headers, config) {
			$scope.items = data.data;

			// Pulls out names of tab titles
			for (var i = data.data.Items.length - 1; i >= 0; i--) {
				$scope.titles[data.data.Items[i].Category.Title] = data.data.Items[i].Category.Title;
			}

			//find first job and first job within that category to use as defaults.
			var firstCategory = $scope.titles[Object.keys($scope.titles)[0]]; //get first category from list of categories
			var firstJob; //will be used to hold first job data
			//loop through each item and get first job that matches category
			angular.forEach($scope.items.Items, function(value, key) {
			//if previously set ignore, angular does not support 'break;'
				if (!firstJob && (value.Category.Title == firstCategory)) {
					firstJob = value;
				}
			});

			$scope.showJobs(firstCategory); //preload first category as default
			$scope.jobShow(firstJob); //preload first job within that category as default
		})

		$scope.showJobs = function (title) {
			$scope.current = title;
			$scope.sameTitle = [];
			$scope.activeTitle = title;

			var firstJob; //will be used to hold first data
			angular.forEach($scope.items.Items, function(value, key) {
				if (value.Category.Title == title) {
					$scope.sameTitle.push(value);
					//if previously set ignore, angular does not support 'break;'
					if (!firstJob) {
						firstJob = value;
					}
				}
			})
			$scope.jobShow(firstJob); //preload first job within this job as default
		}

		$scope.jobShow = function (item) {
			$scope.activeJob = item;
			$scope.job = item;
		}	
	}]);
})();