(function(app) {
    app.Menu = function(menu) {
        var wrapper = document.querySelector('.wrapper');

        document.querySelector('.menu-button').addEventListener('click', function() {
            menu.classList.add('active');

            wrapper.classList.add('menu-active');
        });

        document.querySelector('.menu-page-overlay').addEventListener('click', function() {
            menu.classList.remove('active');

            wrapper.classList.remove('menu-active');
        });
    };
})(window);