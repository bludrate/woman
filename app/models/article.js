'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    title: String,
    description: String,
    content: String,
    updateDate: {type: Date, default: Date.now},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

module.exports = mongoose.model('Article', schema);