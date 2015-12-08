(function(app) {
    function Search(element) {
        this.element = element;
        this.input = element.querySelector('input');

        this.init();
    }

    Search.prototype = {
        init: function() {
            this.meta = createMeta();

            document.querySelector('.icon-search').addEventListener('click', this.open.bind(this));

            this.input.addEventListener('blur', this.close.bind(this));
        },

        close: function() {
            this.element.classList.remove('active');
            document.head.removeChild(this.meta);
        },

        open: function() {
            if (this.element.classList.contains('active')) {
                return ;
            }

            this.element.classList.add('active');

            document.head.appendChild(this.meta);
            this.input.focus();
        }
    };

    function createMeta() {
        var meta = document.createElement('meta');

        //TODO: overview
        meta.content = 'width=device-width, initial-scale=1, user-scalable=no';
        meta.name = 'viewport';

        return meta;
    }
    app.Search = Search;
})(window);