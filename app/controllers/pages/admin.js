'use strict';

var nav = require('../blocks/nav');
var Category = require('../../models/category');

module.exports = function (req, res) {
    Category.find(function(err, items) {
        res.render('pages/admin', {
            title: 'Admin page',
            items: items
        })
    });
};
