'use strict';

var nav = require('../blocks/nav');
var Article = require('../../models/article');

module.exports = {
    url: 'home',
    controller: function (req, res) {
        Article.find(function(err, articles) {
            res.render('pages/home', {
                title: 'Home page',
                articles: articles
            })
        });
    }
};
