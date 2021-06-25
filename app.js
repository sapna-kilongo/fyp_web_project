require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors")
const Vonage = require('@vonage/server-sdk');
const conn = require('./configs/database')
const home = require('./routes/home');
const authentication = require('./routes/authentication');
const session = require('express-session')
const exphbs = require('express-handlebars');
const passport = require("passport");
const local = require("./configs/passport")
const app = express();

const port = process.env.PORT || 7000;
const store = new session.MemoryStore();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 24 * 60 * 60
    },
    store

}))

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// parse application/json


app.use(express.static('public'));
app.use(cors())


// handlebars helper
const { checking ,striptags, formateDate,checkingAlert} = require('./helpers/hbs')


// template engne
app.engine(
    'hbs',
    exphbs({
        helpers: {
            checking,striptags, formateDate,checkingAlert
        },
        defaultLayout: 'main',
        extname: '.hbs',
    })
);

app.set('view engine', 'hbs');





app.use(passport.initialize())
app.use(passport.session())



// routes
app.use('/account', authentication);
app.use('/', home);


app.listen(port, () => {
    console.log(`run on port ${port}`);
});
