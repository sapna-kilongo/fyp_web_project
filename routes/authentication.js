const router = require('express').Router()
const { body, validationResult } = require("express-validator")
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const conn = require('../configs/database');
const { ensureAuth, ensureGuest } = require('../middlleware/loggedin')

router.get('/login', ensureGuest, (req, res) => {

    res.render('home/login', { layout: false });
});




router.post('/login', passport.authenticate('local', {
    successRedirect: '/account/profile', // redirect to the secure profile section
    failureRedirect: '/account/login',
}), async (req, res, next) => {
    const { username, password } = req.body;


});

router.get('/register', (req, res) => {

    res.render('home/register');
});

router.post('/register', (req, res) => {
    const { name, house, meter_number, password1, password2 } = req.body;
    conn.query("SELECT meter_number FROM users WHERE meter_number=?", [meter_number], async (err, data) => {
        if (err) console.log(err);
        if (data.length > 0) {
            return res.render('home/register', { message: "user with that meter exist" })
        }
        else if (password1 !== password2) {
            return res.render('home/register', { message: "password doent match" })
        }
        const hashpassword = await bcrypt.hash(password1, 5);
        conn.query("INSERT INTO users SET name=?,house_number=?,meter_number=?,password=?", [name, house, meter_number, hashpassword], (err, result) => {
            if (err) throw err;
            res.render('home/register');

        });




    })

});

router.get("/profile", ensureAuth, (req, res) => {
    const sql = "SELECT * FROM cost WHERE meter_number=? ORDER BY id DESC LIMIT 1"
    conn.query(sql, [req.user.meter_number], (err, result) => {
        if (err) throw err;
        const value = result[0].status
        res.render("home/profile", {
            data: result,
            user: req.user,
            value: value
        })

    })





})

router.get("/payment/:meter_number", ensureAuth, (req, res) => {
    const value = true
    const sql = "UPDATE cost set status=?"
    conn.query(sql, [value], (err, result) => {
        if (err) {
            res.render('errors/500')
        }
        res.redirect('/account/profile')

    })

})


router.get("/getAll", ensureAuth, (req, res) => {
    const meternumber = req.user.meter_number
    const sql = "SELECT * FROM cost WHERE meter_number=?"
    conn.query(sql, [meternumber], (err, result) => {

        if (err) {
            res.render('errors/500', { Error: err })
        }
        res.render('home/getAll', { data: result })

    })

})



router.get("/logout", (req, res) => {
    req.logout()
    res.redirect('/account/login')

})





module.exports = router;