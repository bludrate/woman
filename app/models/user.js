'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    login: String,
    access: Number
});

module.exports = mongoose.model('User', schema);