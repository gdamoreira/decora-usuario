(function() {
    'use strict';

    angular
        .module('app.usuario')
        .factory('UsuarioForm', factory);

    function factory() {

        var getFormFields = function(disabled, passwordRequired) {
            passwordRequired = typeof passwordRequired == "undefined" ? true : !!passwordRequired;

            var fields = [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: 'Name:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'surname',
                    type: 'input',
                    templateOptions: {
                        label: 'Surname:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'login',
                    type: 'input',
                    templateOptions: {
                        label: 'Usuario:',
                        disabled: disabled,
                        required: true
                    }
                }
            ];

            if (!disabled) {
                fields.push({
                    key: 'password',
                    type: 'input',
                    templateOptions: {
                        type : 'password',
                        label: 'Senha:',
                        disabled: disabled,
                        required: passwordRequired
                    }
                });
            }

            return fields;
        };

        var getFormFieldsEdit = function(disabled) {
            return getFormFields(disabled, false);
        };

        var service = {
            getFormFields: getFormFields,
            getFormFieldsEdit : getFormFieldsEdit
        };

        return service;

    }

})();
