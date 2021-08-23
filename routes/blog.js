var express = require("express");
var router = express.Router();
var blog = require("../models/blog");
var middleware = require("../middleware");


//  BLOG ROUTES
router.get("/", function(req,res){
    res.render("home")
  });

router.get("/blogs",middleware.isloggedIn, function (req,res) {
    blog.find({}, function (err,blogs) {
      if(err){
        console.log(err);
      } else {
        res.render("index", {blogs: blogs, currentUser: req.user})
      }
    });
  });
  
  router.get("/blogs/new",middleware.isloggedIn, function (req,res) {
    res.render("new");
  });
  router.post("/blogs",middleware.isloggedIn, function(req,res){
    blog.create(req.body.blog, function(err, newBlog){
       
      if (err) {
        console.log(err);
        res.redirect("/blogs/new");
      } else {
        newBlog.author.id = req.user._id;
        newBlog.author.username = req.user.username;
        newBlog.save();
        res.redirect("/blogs")
      }
    })
  });
  router.get("/blogs/:id", function (req,res) {
     blog.findById(req.params.id).populate("comments").exec(function (err, fblog) {
       if(err) {
         console.log(err);
         res.redirect("/blogs")
         } else {
         res.render("show", {blog: fblog})
       }
     }) 
  });
  
  router.get("/blogs/:id/edit",middleware.isloggedIn, function(req,res){
      blog.findById(req.params.id, function(err, fblog){
        if(err){
          console.log(err);
          res.redirect("/blogs");
        } else {
          res.render("edit", {blog:fblog})
        }
       })
  })
  
 router.put("/blogs/:id", middleware.isloggedIn, function(req,res){
      blog.findByIdAndUpdate(req.params.id, req.body.blog, {useFindAndModify:false} ,function(err, ublog){
        if (err) {
          console.log(err)
        }
        else {
          res.redirect("/blogs/" + req.params.id)
        }
      })
  })
  router.delete("/blogs/:id", middleware.isloggedIn, function(req,res){
      blog.findByIdAndRemove(req.params.id, {useFindAndModify:false},
        function (err, dblog) {
          if(err) {
            console.log(err);
            res.redirect("/blogs")
          } else {
            res.redirect("/blogs")
          }
        })
  });

  module.exports = router;