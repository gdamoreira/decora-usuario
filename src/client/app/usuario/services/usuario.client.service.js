(function() {
    'use strict';

    angular
        .module('app.usuario')
        .factory('Usuario', Usuario);

    Usuario.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Usuario($resource, API_BASE_URL) {

        var params = {
            usuarioId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/usuario/:usuarioId';

        return $resource(API_URL, params, actions);

    }

})();
