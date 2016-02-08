(function () {
    'use strict';

    angular
        .module('blocks.authentication')
        .factory('authFactory', authFactory)
        .run(authRun);

    authFactory.$inject = ['$rootScope', '$http', '$state', '$window', 'API_BASE_URL'];

    /* @ngInject */
    function authFactory($rootScope, $http, $state, $window, API_BASE_URL) {
        var authFactory = {
            authData: undefined,
            restoreUser : restoreUser,
            login: login,
            logout: logout,
            setAuthData: setAuthData,
            getAuthData: getAuthData,
            isAuthenticated: isAuthenticated
        };

        return authFactory;

        // ----------------------- //

        function restoreUser() {
            var authData = JSON.parse($window.localStorage.getItem("authData"));
            if (!!authData) {
                $http.post(API_BASE_URL + '/auth/restore', authData).then(function(response) {
                    var data = response.data;
                    if (data) {
                        authFactory.authData = data;
                        $rootScope.$broadcast('authChanged');
                        $state.go('listUsuario');
                    } else {
                        authFactory.logout();
                    }
                }).catch(function() {
                    authFactory.logout();
                });
            }
        }

        function login(user) {
            return $http.post(API_BASE_URL + '/auth/login', user);
        }

        function logout() {
            this.authData = undefined;
            $window.localStorage.removeItem("authData");
            $rootScope.$broadcast('authChanged');
        }

        function setAuthData(authData) {
            this.authData = {
                authId: authData.authId,
                authToken: authData.authToken
            };
            $window.localStorage.setItem("authData", JSON.stringify(this.authData));
            $rootScope.$broadcast('authChanged');
        }

        function getAuthData() {
            return this.authData;
        }

        function isAuthenticated() {
            return !angular.isUndefined(this.getAuthData());
        }
    }

    authRun.$inject = ['authFactory'];

    /* @ngInject */
    function authRun(authFactory) {
        authFactory.restoreUser();
    }

})();
