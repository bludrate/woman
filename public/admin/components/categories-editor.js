(function(app) {
    function CategoriesEditor(element) {
        this.element = element;
        this.addForm = this.element.querySelector('#add-form');
        this.table = this.element.querySelector('#categories-table');

        this.init();
    }

    CategoriesEditor.prototype = {
        init: function() {
            this.addForm.addEventListener('submit', this.add.bind(this));
            this.table.addEventListener('change', this.editCategory.bind(this));
            this.table.addEventListener('click', this.remove.bind(this));
        },

        remove: function(e) {
            console.log(e);
            if (e.target.classList.contains('remove')) {
                var tr = e.target.parentNode.parentNode;
                var id = tr.id;

                app.utils.send('/admin/categories', 'DELETE', {id: id}).then(function(data) {
                    console.log('deleted', data);

                    tr.parentNode.removeChild(tr);
                });
            }
        },

        editCategory: function(e) {
            var tr = e.target.parentNode.parentNode;

            var data = {
                id: tr.id,
                name: tr.querySelector('[name=name]').value.trim(),
                link: tr.querySelector('[name=link]').value.trim()
            };

            app.utils.send('/admin/categories', 'PUT', data).then(function(data) {
                console.log('saved', data);
            });
        },

        add: function(e) {
            var data = {
                name: this.addForm.name.value.trim(),
                link: this.addForm.link.value.trim()
            };

            app.utils.send('/admin/categories', 'PUT', data).then(function(category) {
                this.addRow(category);
                this.addForm.reset();
            }.bind(this));

            e.preventDefault();
        },

        addRow: function(data) {
            var tr = document.createElement('tr');

            tr.id = data._id;

            tr.innerHTML = '<td><input type="text" name="name" value="' + data.name + '"/></td><td><input type="text" name="link" value="' + data.link + '"/></td><td><button class="remove">remove</button></td>';

            this.table.querySelector('tbody').appendChild(tr);
        }
    };

    app.CategoriesEditor = CategoriesEditor;
})(window);