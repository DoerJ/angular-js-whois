var domainParser = angular.module('domainParser', ['domainServices']);

domainParser.controller("domainHandler", function($scope, $http, services) {
    $scope.sendDomain = function(domainName) {
        var onSuccess = function(data, status, headers, config) {
            $scope.status = data.data.code;
            $scope.data = data.data.whoisData;
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
        $scope.domainName = '';
        var domainValidator = services.domainValidator;
        if(!domainValidator(domainName)) { alert('Please enter a valid domain name!'); return; }
        $http(postReq)
            .then(onSuccess)
            .then(onError);
    }
});
