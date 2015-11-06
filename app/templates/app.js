'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public', { extensions: ['html'] }));
app.use(express.static(__dirname + 'public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var port = (process.env.PORT || 3000);

app.listen(port, function () {
  console.log('App started on port ' + port);
});
