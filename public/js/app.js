(function(app) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        runApp();

        document.body.classList.remove('preloader');

        FastClick.attach(document.body, {
            tapDelay: 1,
            tapTimeout: 500
        });

        console.info('site initialized');
    });

    function runApp() {
        app.modules = {};

        var elements = document.querySelectorAll('[data-module]');

        Array.prototype.forEach.call(elements, function(element) {
            var moduleName = element.getAttribute('data-module');

            if (moduleName in app.modules) {
                if (app.modules[moduleName] instanceof Array) {

                } else {
                    var m = app.modules[moduleName];

                    app.modules[moduleName] = [m, new app[moduleName](element)];
                }
            } else {
                app.modules[moduleName] = new app[moduleName](element);
            }
        });
    }
})(window);