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