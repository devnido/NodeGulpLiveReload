var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views',__dirname+'/app/views');
app.use(express.static('./public'));



app.get('/', function (req, res) {
    res.render('index', { title: 'Title', message: 'Message from server node'});
});

var server = app.listen(3000);
