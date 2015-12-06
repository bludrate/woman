'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    title: String,
    description: String,
    content: String,
    updateDate: {type: Date, default: Date.now},
    mainImage: String,
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    attachedFiles: [String]
});

module.exports = mongoose.model('Article', schema);