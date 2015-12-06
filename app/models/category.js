'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    link: String
});

module.exports = mongoose.model('Category', schema);