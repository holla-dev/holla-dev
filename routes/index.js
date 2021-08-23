var express    = require("express");
var router     = express.Router();
var User       = require("../models/user");
var passport   = require("passport");



router.get("/register", function(req,res){
    res.render("register")
  })
  
  router.post("/register", function(req, res){
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(err, User){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/blogs");
  
        })
    })
  });
  
  router.get("/login", function(req,res){
    res.render("login")
  });
  
  router.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
  }), function(req,res){
  });
  // logout routes
  router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/")
  })

  module.exports = router;