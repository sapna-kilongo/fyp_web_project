const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    res.render('index', {
        title: 'hello world',
    });
});

router.post('/home', (req, res) => {
    console.log(req.body.sensor);
    res.redirect('/home');

});

module.exports = router;