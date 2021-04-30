const router = require('express').Router();
const validator = require('express-validators');
const passport = require('passport');

router.get('/login', (req, res) => {
    console.log(req.params.name);
    res.render('home/login');
});

router.post('/login', (req, res) => {
    if (req.body.email)
        res.redirect('/home');
});

router.get('/register', (req, res) => {
    res.render('home/register');
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.redirect('/account/login');
});
module.exports = router;