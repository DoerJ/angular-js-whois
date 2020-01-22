var domainServices = angular.module('domainServices', []);

domainServices
    .factory('services', function() {
        let domainValidator = (domainName) => {
            if(domainName === undefined || domainName === '') return false;
            domainName = domainName.toLowerCase();
            let domainNameParse = domainName.trim().split('.');
            let domainSuffix = domainNameParse[domainNameParse.length-1];
            switch (domainSuffix) {
                case 'com':
                    return true;
                    break;
                case 'net':
                    return true;
                    break;
                case 'edu':
                    return true;
                    break;
            }
            return false;
        }
        return { domainValidator }
    })
