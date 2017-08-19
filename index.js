
require('dotenv').config();

var express = require('express');

var app = express();

require('./app')(app);

app.listen(app.get('port'), () => {
    console.log(`I'm listening to port ${app.get('port')}`);
});