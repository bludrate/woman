'use strict';

var nav = require('../blocks/nav');

module.exports = {
    url: 'admin',
    controller: function (req, res) {
        res.render('pages/admin', {
            title: 'Админка'
        })
    }
};
