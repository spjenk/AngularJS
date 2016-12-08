(function () {

    var app = angular.module("nrlMultiViewer", []);

    var MainController = function ($scope, $http) {

        var OPEN = "o";
        var MATCH = "M";

        $http.get('https://api.ubet.com/sales/vmax/web/data/sports/league/83').success(function (data) {
            var meetings = data.Sport.Leagues[0].Meetings;
            for (meeting in meetings) {
                if (meetings[meeting].MatchRoundSeason == MATCH) {
                    $http.get("https://api.ubet.com/sales/vmax/web/data/sports/meeting/" + meetings[meeting].MeetingId)
                        .then(onMeeting, onError);
                }
            }
        });

        var onMeeting = function (response) {
            var mainEvents = response.data.Sport.Leagues[0].Meetings[0].MainEvents;
            for (mainEvent in mainEvents) {
                $http.get("https://api.ubet.com/sales/vmax/web/data/sports/mainevent/" + mainEvents[mainEvent].MainEventId)
                    .then(onOffer, onError);
            }
        }

        var onOffer = function (response) {
            var subEvents = response.data.MainEvent.SubEvents;
            for (subEvent in subEvents) {
                var se = subEvents[subEvent];
                if (se.Status == OPEN) {
                    $scope.subEvents.push(se);
                }
            }
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data";
        };

        $scope.message = "Sports Multi"
        $scope.subEvents = []
        $scope.userSelection = [];
    };

    app.controller("MainController", ["$scope", "$http", MainController]);

}());