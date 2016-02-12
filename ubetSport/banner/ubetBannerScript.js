(function () {

    var app = angular.module("ubetBanner", []);

    var UBetBannerController = function ($scope, $http) {

        $http.get('https://api.ubet.com/sales/vmax/web/data/sports/meeting/mainevent/subevent/2262007').success(function (data) {
            $scope.sportData = data;
            $scope.ubetOffers = data.Sport.Leagues[0].Meetings[0].MainEvents[0].SubEvents[0].Offers;
        });

        var onError = function (reason) {
            $scope.ubetError = "Could not fetch the data";
        };
    };

    app.controller("UBetBannerController", ["$scope", "$http", UBetBannerController]);

}());