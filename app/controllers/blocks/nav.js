'use strict';

var db = require('../../database');

var categories;

var dfd = new Promise(function(resolve, reject) {
    if (categories) {
        resolve(categories);
    } else {
        db.connection.query('SELECT name,link FROM category', function(err, rows, fields) {
            if (err) reject(err);
            else {
                categories = rows;
                resolve(rows);
            }
        });
    }
});

module.exports = {
    getCategories: function() {
        return dfd;
    }
};