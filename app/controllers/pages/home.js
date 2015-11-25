'use strict';

module.exports = function (req, res) {
    res.render('pages/home', {
        title: 'Home page',
        message: 'This is the "home" action of "pages" controller'
    })
};
