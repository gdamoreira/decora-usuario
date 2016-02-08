(function () {
    'use strict';

    angular
        .module('blocks.authentication')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authFactory', '$state'];
    /* @ngInject */
    function LoginController(authFactory, $state) {
        var vm = this;

        vm.user = {};
        vm.login = login;

        // -------------------- //

        function login() {
            authFactory.login(vm.user).then(function(response) {
                authFactory.setAuthData(response.data);
                $state.go('listUsuario');
            });
        }
    }
})();
