var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'mysql://adminjrn4b82:5f6faxtw76eX@127.0.250.1:3306',
    user     : 'adminjrn4b82',
    password : '5f6faxtw76eX',
    database : 'ladyone'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.end();
