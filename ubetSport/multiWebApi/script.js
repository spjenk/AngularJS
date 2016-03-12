(function () {

    var app = angular.module("nrlMultiViewer", []);

    var MainController = function ($scope, $http) {

        var H2H = 72;
        var OPEN = "o";
        var nrlUrl = 'https://ubet.com/api/sports/10/48';

        $http({method: 'GET', url: nrlUrl}).success(function (data) {
            for (mainEvent in data.MainEvents) {
                var subEvents = data.MainEvents[mainEvent].SubEvents;
                for (subEvent in subEvents) {
                    var se = subEvents[subEvent];
                    if (se.BetTypeId == H2H && se.Status == OPEN) {
                        $scope.subEvents.push(se);
                    }
                }
            }
        });

        var onError = function (reason) {
            $scope.error = "Could not fetch the data";
        };

        $scope.message = "Sports Multi";
        $scope.subEvents = [];
        $scope.userSelection = {};
    };

    app.controller("MainController", ["$scope", "$http", MainController]);

}());