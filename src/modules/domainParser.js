var domainParser = angular.module('domainParser', ['domainServices']);

domainParser.controller("domainHandler", function($scope, $http, services) {
    $scope.sendDomain = function(domainName) {
        var onSuccess = function(data, status, headers, config) {
            let domainValidator = services.domainValidator;
            if(!domainValidator(domainName)) { alert('Please enter a valid domain name!'); return; }
            let whoisData = data.data.whoisData;
            let whoisDataFormated = whoisData.trim().split('\n');
            $scope.data = whoisDataFormated;
        }
        var onError = function(data, status, headers, config) {
            $scope.error = status;
        }
        var postReq = {
            method: 'POST',
            url: 'http://localhost:5000',
            cache: true,
            data: { domain: domainName }
        }
        $http(postReq)
            .then(onSuccess)
            .then(onError);
    }
});
