var express = require("express");
var router = express.Router();
var comment = require("../models/comment")
var blog = require("../models/blog");
var middleware = require("../middleware");
// COMMENTS ROUTES
router.get("/blogs/:id/comments/new", middleware.isloggedIn ,function(req,res){
    blog.findById(req.params.id, function(err, blog){
      if(err){
        console.log(err)
      } else {
       res.render("newcomment", {blog: blog})
      }
    })
   });
   
   router.post("/blogs/:id/comments", middleware.isloggedIn, function(req,res){
     // find blog with id
     blog.findById(req.params.id, function(err, blog){
      if(err){
        console.log(err)
      } else {
       comment.create(req.body.comment, function(err, comment){
         if(err){
           console.log(err)
         } else {
           comment.author.username = req.user.username;
           comment.author.id       = req.user._id;
           comment.save()
           blog.comments.push(comment)
           blog.save();
           res.redirect("/blogs/" + req.params.id)
         }
       })
      }
     })
   })

   module.exports = router;