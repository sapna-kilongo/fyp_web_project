
var passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const conn = require('./database');
const bcrypt = require("bcrypt");


passport.serializeUser(function (user, done) {
  done(null, user.meter_number);
});

// used to deserialize the user
passport.deserializeUser(function (meter_number, done) {
  conn.query("SELECT * FROM users WHERE meter_number = ? ", [meter_number], function (err, rows) {
    done(err, rows[0]);
  });

});



passport.use(new LocalStrategy(
  (username, password, done) => {
    const sqli = "SELECT * FROM  users WHERE meter_number=?";

    conn.query(sqli, [username], async (err, result, fields) => {
      try {
        if (result[0].length == 0) {
          done(null, false);
        }
        else {
          const compared = await bcrypt.compare(password,result[0].password)
          if (compared) {

            done(null, result[0])
          }
          else {
            done(null, false)

          }


        }

      } catch (error) {
        done(err, false);

      }


      ;




    })


    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));