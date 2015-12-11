(function() {

  var app = angular.module("githubViewer", []);

  var MainController = function($scope, $http) {
  
  $http.get('https://api.ubet.com/sales/vmax/web/data/sports/meeting/4339').success(function(data) {
            $scope.sportData = data;
			$scope.mainEvents = data.Sport.Leagues[0].Meetings[0].MainEvents;
        });   

    $scope.isResultType = function(subEvent) {
		return subEvent.BetTypeId == 91;
	};
	
	var onSportComplete = function(response) {
        $scope.sport = response.data;        
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data";
    };

    $scope.message = "Sports Multi"
  };

  app.controller("MainController", ["$scope", "$http", MainController]);

}());