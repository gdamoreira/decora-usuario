(function () {
    'use strict';

    angular
        .module('app.usuario')
        .controller('UsuarioController', UsuarioController);

    UsuarioController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Usuario',
        'TableSettings',
        'UsuarioForm'];
    /* @ngInject */
    function UsuarioController(logger,
        $stateParams,
        $location,
        Usuario,
        TableSettings,
        UsuarioForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Usuario);
        vm.usuario = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = UsuarioForm.getFormFields(disabled);
            vm.formFieldsEdit = UsuarioForm.getFormFieldsEdit(disabled);
        };

        vm.create = function() {
            // Create new Usuario object
            var usuario = new Usuario(vm.usuario);

            // Redirect after save
            usuario.$save(function(response) {
                logger.success('Usuario criado.');
                $location.path('usuario/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Usuario
        vm.remove = function(usuario) {

            if (usuario) {
                usuario = Usuario.remove({usuarioId:usuario.id}, function() {
                    logger.success('Usuario deletado.');
                    vm.tableParams.reload();
                });
            } else {
                vm.usuario.$remove(function() {
                    logger.success('Usuario deletado');
                    $location.path('/usuario');
                });
            }

        };

        // Update existing Usuario
        vm.update = function() {
            var usuario = vm.usuario;

            usuario.$update(function() {
                logger.success('Usuario editado.');
                $location.path('usuario/' + usuario.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewUsuario = function() {
            vm.usuario = Usuario.get({usuarioId: $stateParams.usuarioId});
            vm.setFormFields(true);
        };

        vm.toEditUsuario = function() {
            vm.usuario = Usuario.get({usuarioId: $stateParams.usuarioId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Usuario View');
        }
    }

})();
