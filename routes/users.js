var express = require('express');
var router = express.Router();
var User = require('./userModel');
var passport = require('passport');

router.post("/login",
    function(req, res, next) {
        passport.authenticate('local', function(err, info) {
            if (err) {
                console.log(info)
                return res.status(401).send({
                    success: false,
                    err: "Username and password mismatched!"
                });
            } else {
                console.log("====")
            }
            return res.send({
                success: true,
                msg: info.message,
                user: info.user
            });
        })(req, res, next);
    }
);

router.post('/', function(req, res, next) {
    console.log('Register user..');
    var payload = req.body;
    var user = new User(payload);

    var userSaved = function(err, usr) {
        if (err) {
            throw new Error(err);
        }
        var usr = usr.toObject();
        delete usr.password;
        delete usr.__v;
        return res.send({
            success: true,
            user: usr
        });
    };
    user.save(userSaved);
});

router.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));
router.get("/auth/facebook/callback",
    passport.authenticate("facebook",{ failureRedirect: '/login'}),
    function(req,res){
        res.render("profile", {user : req.user});
    }
);

router.get('/auth/google',
  passport.authenticate(
    'google',
      {
        scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
        ]
      })
  );

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;