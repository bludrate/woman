(function(app) {
    function Menu(element) {
        this.element = element;
        this.wrapper = document.querySelector('.wrapper');

        this.init();
    }

    Menu.prototype = {
        init: function() {
            document.querySelector('.menu-button').addEventListener('click', this.open.bind(this));
            document.querySelector('.menu-page-overlay').addEventListener('click', this.close.bind(this));
        },

        open: function() {
            this.element.classList.add('active');

            this.wrapper.classList.add('menu-active');
        },
        close: function() {
            this.element.classList.remove('active');

            this.wrapper.classList.remove('menu-active');
        }
    };

    app.Menu = Menu;
})(window);