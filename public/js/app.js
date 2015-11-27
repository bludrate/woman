(function(app) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initMenu();

        document.body.classList.remove('preloader');

        console.info('site initialized');

        FastClick.attach(document.body, {
            tapDelay: 1,
            tapTimeout: 500
        });
    });
})(window);