const express = require('express');
const router = express.Router();
const conn = require("../configs/database")
const validation = require("../middlleware/validation")



router.get('/home', (req, res) => {
  let sql = `SELECT * FROM  users`;
  conn.query(sql, function (err, data) {
    if (err) throw err;
    res.render('index', { data })
  });
});




router.post('/home', (req, res) => {
  const volume = req.body.sensor;
  const meter_number = req.body.api_key;
  const units = req.body.unit;
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();
  const status = false;
  conn.query("SELECT * FROM cost WHERE meter_number=? ORDER BY id DESC LIMIT 1", [meter_number], (err, result) => {
    const previousunits = result[0].units;
    const unitused = units - previousunits;
    const cost = unitused * 1679.63;
    let sql = `INSERT INTO cost(meter_meter,volume,units,cost,status,date,time ) VALUES (?)`;
    let values = [
      meter_number,
      volume,
      units,
      cost,
      status,
      date,
      time,
    ];
    conn.query(sql, [values], function (err, data, fields) {
      if (err) throw err;
      res.redirect('/home');
    });


  })



});





router.get('/sendTo', (req, res) => {
  let sql = `SELECT * FROM  cost ORDER BY id DESC LIMIT 1`;
  conn.query(sql, function (err, data) {
    if (err) throw er;
    res.json(data)
  });
});




router.get("/:meter_number", (req, res) => {
  conn.query("DELETE FROM users WHERE meter_number=?", [req.params.meter_number], (err, result, fields) => {
    if (err) throw err;
    res.redirect('/home');


  });

})


router.get("/:meter_number", (req, res) => {
  conn.query("UPDATE FROM users WHERE meter_number=?", [req.params.meter_number], (err, result, fields) => {
    if (err) throw err;
    res.redirect('/home')


  });

})



router.get("/views/:id", (req, res) => {
  conn.query("SELECT * FROM ", [req.params.meter_number], (err, result, fields) => {
    if (err) throw err;
    res.redirect("/home")
  })




})





module.exports = router;