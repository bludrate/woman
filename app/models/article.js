'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    teaser: String,
    content: String,
    createDate: {type: Date, default: Date.now},
    updateDate: {type: Date, default: Date.now},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    published: {type: Boolean, default: true}
});

module.exports = mongoose.model('Article', schema);