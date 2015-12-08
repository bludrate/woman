'use strict';

var nav = require('../blocks/nav');
var Category = require('../../models/category');

module.exports = {
    url: 'admin/article',
    controller: function (req, res) {
        Category.find(function(err, categories) {
            res.render('pages/admin-article', {
                title: 'Редактор статьи',
                categories: categories
            })
        });
    }
};
