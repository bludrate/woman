'use strict';

var nav = require('../blocks/nav');
var Category = require('../../models/category');
var Article = require('../../models/article');

module.exports = {
    url: 'admin/article/:id',
    controller: function (req, res) {
        Category.find(function(err, categories) {
            res.render('pages/admin-article', {
                title: 'Редактор статьи',
                categories: categories,
                articleId: req.params.id
            })
        });
    }
};
