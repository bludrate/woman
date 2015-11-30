'use strict';

var express = require('express'),
    ejsLocals = require('ejs-locals'),
    pages = require('./controllers/pages'),
    app = express();

app.engine('ejs', ejsLocals);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//app.use(express.compress());
app.use('/public', express.static(__dirname + '/../public'));

app.get('/', function (req, res) {
    res.redirect('home')
});

for (var page in pages) {
    app.get('/' + page, pages[page]);
}

app.listen(80);
