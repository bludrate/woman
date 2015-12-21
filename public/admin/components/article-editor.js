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
            this.form.addEventListener('submit', this.save.bind(this));
        },

        save: function(event) {
            event.preventDefault();

            var data = this.serialize();

            app.utils.send('/admin/article', 'PUT', data).then(function(article) {
                console.log('new article', article);
                this.form.reset();
            }.bind(this));
        },

        serialize: function() {
            return {
                id: this.form.id.value,
                title: this.form.title.value.trim(),
                teaser: this.form.teaser.value.trim(),
                categoryId: this.form.categoryId.value,
                content: this.form.content.value.trim()
            };
        },

        updateView: function() {
            var data = this.serialize();

            var html = '<div class="article">';

            html += '<div class="article__title">' + data.title + '</div>';
            html += '<div class="article__teaser">' + data.teaser + '</div>';
            html += '<div class="article__content">' + data.content + '</div>';

            this.viewContent.innerHTML = html + '</div>';
        }
    };

    app.ArticleEditor = ArticleEditor;
})(window);