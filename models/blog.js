var mongoose = require("mongoose");

// Mongo Schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    created: {type: Date, default: Date.now},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ],
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var blog = mongoose.model("blog", blogSchema);
module.exports = blog;
 

