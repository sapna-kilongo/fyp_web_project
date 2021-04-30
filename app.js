const express = require('express');
var bodyParser = require('body-parser')
const Vonage = require('@vonage/server-sdk');
require('dotenv').config();
const port = process.env.PORT || 8000;

//const vonage = new Vonage({
//apiKey: NEXMO_API_KEY,
//apiSecret: NEXMO_API_SECRET
//})
const exphbs = require('express-handlebars');
const home = require('./routes/home');
const authentication = require('./routes/authentication');
const app = express();

// body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

// template engne
app.engine(
    'hbs',
    exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
    })
);

app.set('view engine', 'hbs');

// routes
app.use('/', home);
app.use('/account', authentication);

app.listen(port, () => {
    console.log('run on port $ {{ port }}');
});