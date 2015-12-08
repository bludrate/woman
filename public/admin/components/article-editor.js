(function(app) {
    function ArticleEditor(element) {
        this.element = element;
        this.form = this.element.querySelector('#article-form');
        this.viewContent = this.element.querySelector('#view-content');

        this.init();
    }

    ArticleEditor.prototype = {
        init: function() {
            this.element.addEventListener('change', this.updateView.bind(this));
            $('#content').froalaEditor().on('froalaEditor.contentChanged', this.updateView.bind(this));
        },

        serialize: function() {
            var data = {};

            data.title = this.form.title.value.trim();
            data.description = this.form.description.value.trim();
            data.categoryId = this.form.categoryId.value;
        },

        updateView: function() {
            var html = '<div class="article">';

            html += '<div class="article__title">' + this.form.title.value + '</div>';
            html += '<div class="article__description">' + this.form.description.value + '</div>';
            html += '<div class="article__content">' + this.form.content.value + '</div>';

            this.viewContent.innerHTML = html + '</div>';
        }
    };

    app.ArticleEditor = ArticleEditor;
})(window);