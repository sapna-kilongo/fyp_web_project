const express = require('express');
const bodyparser = require('body-parser');
const Vonage = require('@vonage/server-sdk');
require('dotenv').config();
const port = process.env.PORT || 8000;

//const vonage = new Vonage({
//apiKey: NEXMO_API_KEY,
//apiSecret: NEXMO_API_SECRET
//})
const handlebars = require('express-handlebars');
const home = require('./routes/home');
const app = express();

// body parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

// template engne
app.engine('handlebars', handlebars());
app.set('view engine', '.hbs');

// routes
app.use('/', home);

app.listen(port, () => {
    console.log('run on port $ {{ port }}');
});