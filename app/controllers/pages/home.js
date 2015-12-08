'use strict';

var nav = require('../blocks/nav');

module.exports = {
    url: 'home',
    controller: function (req, res) {
        res.render('pages/home', {
            title: 'Home page'
        })
    }
};
