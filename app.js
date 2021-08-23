var bodyparser         = require("body-parser"),
mongoose               = require("mongoose"),
express                = require("express"),
methodOveride          = require("method-override"),
 blog                  = require("./models/blog"),
 User                  = require("./models/user"),
 seedDB                = require("./seed"),
 comment               = require("./models/comment"),
 passport              = require("passport"),
 localStrategy         = require("passport-local"),
 passportLocalMongoose = require("passport-local-mongoose");
 var commentRoutes     = require("./routes/comment"),
 blogRoutes            = require("./routes/blog"),
 indexRoutes            = require("./routes/index");
 var middleware            = require("./middleware");
 var app                   = express();
 var url = "mongodb://localhost/restful_blog"
 mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
 const PORT = process.env.PORT || 5000;

//  const { MongoClient } = require('mongodb');
//  const uri = "mongodb+srv://olafimihanayomide:<23653161>@blogapp.ds2mf.mongodb.net/blogapp?retryWrites=true&w=majority";
//  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//  client.connect(err => {
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
//  });

app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOveride("_method"))
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//  BLOG ROUTES

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: " I am the GOAT",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next()
});
app.use(blogRoutes);
app.use(indexRoutes);
app.use(commentRoutes); 
// seed the databaseseedDB();

// SERVER LOCALHOST

app.listen(PORT, function(){ 
    console.log("App is listening on port")
    console.log("You are doing well")
})