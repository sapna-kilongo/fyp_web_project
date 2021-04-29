const express = require('express');
const router = express.Router();

router.get('/home', async(req, res) => {
    res.send('hello world');
});

router.post('/home', (req, res) => {
    console.log(req.body.name);
    res.send('hey its post data');
});

module.exports = router;