'use strict';

var mongoose = reuqire('mongoose');
var sha256 = require('crypto-js/sha256');

var salt = 'adgjl';
var pepper = 'Some times I\'m gonna crazy';

function encrypt(text){
    var p = pepper;
    var r = text;

    while(p = p.slice(1)) {
        r = sha256(r).toString();
    }

    r = sha256(salt + r).toString();

    return r;
}

function signIn(login, password) {
    return new Promise(function(resolve, reject) {
        db.connection.query('SELECT * FROM user WHERE login = ' + login, function(data) {
            console.log(data);
        });
    });
}

signIn();

module.exports = {
    signIn: signIn
};