(function () {
    'use strict';

    angular
        .module('blocks.authentication')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/blocks/authentication/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'login'
                }
            }
        ];
    }
})();
