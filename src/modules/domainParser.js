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
        $scope.domainName = '';
        var grecaptchaResponse = grecaptcha.getResponse();
        var domainValidator = services.domainValidator;
        // validation
        if(!domainValidator(domainName)) { alert('Please enter a valid domain name!'); return; }
        if(grecaptchaResponse.length === 0) { alert('Please resolve Recaptcha!'); return; }
        // config request
        var postReq = {
            method: 'POST',
            url: 'http://localhost:5000',
            cache: true,
            data: { domain: domainName }
        }
        // send request
        $http(postReq)
            .then(onSuccess)
            .then(onError);
    }
});
