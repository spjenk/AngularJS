(function() {

  var app = angular.module("nrlMultiViewer", []);

  var MainController = function($scope, $http) {
  
  $http.get('https://api.ubet.com/sales/vmax/web/data/sports/meeting/424').success(function(data) {
            $scope.sportData = data;
			var mainEvents = data.Sport.Leagues[0].Meetings[0].MainEvents;
			for (me in mainEvents) {
				$http.get("https://api.ubet.com/sales/vmax/web/data/sports/mainevent/" + mainEvents[me].MainEventId)
				.then(onOffer, onError);
			}
        });		
	
	var onOffer = function(response) {					
        var subEvents = response.data.MainEvent.SubEvents;
        for (subEvent in subEvents) {
			var se  = subEvents[subEvent];
			if (se.BetTypeId ==  72) {
				$scope.subEvents.push(se);
			}
		}
    };
	
	var onError = function(reason) {
      $scope.error = "Could not fetch the data";
    };

    $scope.message = "Sports Multi"
	$scope.subEvents  = []
  };
  
  app.controller("MainController", ["$scope", "$http", MainController]);

}());