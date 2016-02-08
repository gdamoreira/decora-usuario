(function () {
    'use strict';

    angular
        .module('blocks.authentication')
        .factory('authHttpRequestInterceptor', authHttpRequestInterceptor)
        .config(authHttpRequestInterceptorConfig)
        .run(stateChangeInterceptor);

    authHttpRequestInterceptor.$inject = ['$injector', '$rootScope', '$q'];

    /* @ngInject */
    function authHttpRequestInterceptor($injector, $rootScope, $q) {
        var authHttpRequestInterceptor = {
            request: request,
            response: response
        };

        return authHttpRequestInterceptor;

        // --------------------- //

        function request($request) {
            var authFactory = $injector.get('authFactory');
            if (authFactory.isAuthenticated()) {
                $request.headers['auth-id'] = authFactory.getAuthData().authId;
                $request.headers['auth-token'] = authFactory.getAuthData().authToken;
            }
            return $request;
        }

        function response($response) {
            if ($response.status === 401) {
                $injector.get('$state').go('login');
                return $q.reject($response);
            }
            return $response;
        }
    }

    authHttpRequestInterceptorConfig.$inject = ['$httpProvider'];

    /* @ngInject */
    function authHttpRequestInterceptorConfig($httpProvider) {
        $httpProvider.interceptors.push('authHttpRequestInterceptor');
    }

    function stateChangeInterceptor($rootScope, authFactory, $state) {
        $rootScope.$on('$stateChangeStart', function (event, current, previous) {
            if (current.name == 'login') {
                return;
            }
            if (!authFactory.authData) {
                $state.go('login');
                event.preventDefault();
            }
        });
    }

})();
