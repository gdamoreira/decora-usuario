(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate',
            'ngSanitize',
            'blocks.authentication',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'ui.router',
            'ngplus',
            'ngResource',
            'ui.bootstrap',
            'ngTable',
            'formly',
            'formlyBootstrap'
        ]);
})();
