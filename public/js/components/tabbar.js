(function(app) {

    function TabBar(element) {
        this.element = element;
        this.links = element.querySelectorAll('.tabbar-button');
        this.contents = element.querySelectorAll('.tabbar-content');

        this.init();
    }

    TabBar.prototype = {
        init: function() {
            this.element.addEventListener('click', function(event) {
                if (event.target.classList.contains('tabbar-button')) {
                    var index = Array.prototype.indexOf.call(this.links, event.target);

                    this.toggleTab(index);
                }
            }.bind(this));

            this.index = 0;
            this.links[0].classList.add('active');
            this.contents[0].classList.add('active');
        },

        toggleTab: function(index) {
            this.links[this.index].classList.remove('active');
            this.contents[this.index].classList.remove('active');

            this.links[index].classList.add('active');
            this.contents[index].classList.add('active');

            this.index = index;
        }
    };

    app.TabBar = TabBar;
})(window);