'use strict';

var nav = require('../blocks/nav');

module.exports = function (req, res) {
    nav.getCategories().then(function(categories) {
        res.render('pages/home', {
            title: 'Home page',
            message: 'This is the "home" action of "pages" controller',
            nav: categories
        })
    });
};
