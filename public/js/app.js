(function(app) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initMenu();

        document.body.classList.remove('preloader');

        console.info('site initialized');
    });
})(window);