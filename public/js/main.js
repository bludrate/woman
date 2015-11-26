(function(app) {
    app.utils = {
        one: function(element, event, _callback, useCapture) {
            element.addEventListener(event, callback, useCapture);

            function callback(event) {
                element.removeEventListener(event, callback, useCapture);
                _callback(event);
            }
        }
    };
})(window);
(function(app) {
    app.initMenu = function() {
        var menu = document.querySelector('.menu');
        var wrapper = document.querySelector('.wrapper');

        document.querySelector('.menu-button').addEventListener('click', function() {
            menu.classList.toggle('active');

            wrapper.classList.toggle('menu-active', menu.classList.contains('active'));
        });
    }
})(window);
(function(app) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initMenu();

        document.body.classList.remove('preloader');

        console.info('site initialized');
    });
})(window);
(function(app) {
    document.addEventListener('touchstart', function(event) {
        var target = event.target;

        target.classList.add('hover');

        app.utils.one(document, 'touchend', function() {
            target.classList.remove('hover');
        });
    });
})(window);