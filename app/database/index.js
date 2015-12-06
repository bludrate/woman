'use-strict'

var mongoose = require('mongoose');
var Promise = require('promise-polyfill');

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/ladyone';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

module.exports = {
    connect: function() {
        mongoose.connect(connection_string);

        return new Promise(function(resolve, reject) {
            mongoose.connection.on('error', reject);
            mongoose.connection.on('open', resolve);
        });
    }
};