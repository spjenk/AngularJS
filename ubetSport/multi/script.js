(function () {

    var app = angular.module("nrlMultiViewer", []);

    var MainController = function ($scope, $http) {

        var H2H = 72;
        var OPEN = "o";
        var MATCH = "M";

        $http.get('https://api.ubet.com/sales/vmax/web/data/sports/league/48').success(function (data) {
            var meetings = data.Sport.Leagues[0].Meetings;
            for (blah in meetings) {
                if (meetings[blah].MatchRoundSeason == MATCH) {
                    $http.get("https://api.ubet.com/sales/vmax/web/data/sports/meeting/" + meetings[blah].MeetingId)
                        .then(onMeeting, onError);
                }
            }
        });

        var onMeeting = function (response) {
            var mainEvents = response.data.Sport.Leagues[0].Meetings[0].MainEvents;
            for (me in mainEvents) {
                $http.get("https://api.ubet.com/sales/vmax/web/data/sports/mainevent/" + mainEvents[me].MainEventId)
                    .then(onOffer, onError);
            }
        }

        var onOffer = function (response) {
            var subEvents = response.data.MainEvent.SubEvents;
            for (subEvent in subEvents) {
                var se = subEvents[subEvent];
                if (se.BetTypeId == H2H && se.Status == OPEN) {
                    $scope.subEvents.push(se);
                }
            }
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data";
        };

        $scope.message = "Sports Multi"
        $scope.subEvents = []
        $scope.userSelection = {};
    };

    app.controller("MainController", ["$scope", "$http", MainController]);

}());