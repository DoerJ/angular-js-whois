var domainParser = angular.module('domainParser', []);

domainParser.controller("domainHandler", function($scope, $http) {
    $scope.sendDomain = function(domainName) {
        var onSuccess = function(data, status, headers, config) {
            let whoisData = data.data.whoisData;
            let whoisDataFormated = whoisData.trim().split('\n');
            console.log(whoisDataFormated)
            $scope.data = whoisDataFormated;
        }
        var onError = function(data, status, headers, config) {
            $scope.error = status;
        }
        var postReq = {
            method: 'POST',
            url: 'http://localhost:5000',
            data: { domain: domainName }
        }
        $http(postReq)
            .then(onSuccess)
            .then(onError);
    }
});
