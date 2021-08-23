var mongoose = require("mongoose");
var blog = require("./models/blog");
var comment = require("./models/comment");
function seedDB(){
    // delete all blogs
    blog.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
            console.log("blog has been deleted");
})
};

module.exports = seedDB;