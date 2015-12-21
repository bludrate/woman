'use strict';

var nav = require('../blocks/nav');
var Category = require('../../models/category');

module.exports = {
    url: 'admin/categories',
    controller: function (req, res) {
        Category.find(function(err, categories) {
            res.render('pages/admin-categories', {
                title: 'Редактор категорий',
                categories: categories
            })
        });
    }
};
