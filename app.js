var express = require("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    passportLocalMongoose = require("passport-local-mongoose");

var url = process.env.DATABASEURL || "mongodb://localhost/mountain_db";    
mongoose.connect(url);
    
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
//passport configuration
app.use(require("express-session")({
    secret:"secret word",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine","ejs");

//Data model for Mountain
var mountainSchema = new mongoose.Schema({
    title:String,
    image:String,
    description:String
});

var Mountain = mongoose.model("Mountain",mountainSchema);

//Data mode for User
var userSchema = new mongoose.Schema({
    username:String,
    password:String
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User",userSchema);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//HOME ROUTE
app.get("/",function(req,res){
    res.redirect("/mountains");
});

//INDEX ROUTE
app.get("/mountains",function(req,res){
    Mountain.find({},function(err,foundMountains){
        if(err)
            console.log(err);
        else
            res.render("index",{mountains:foundMountains});
    });
});

//NEW ROUTE
app.get("/mountains/new",isLoggedIn,function(req, res) {
    res.render("new");
});

//CREATE ROUTE
app.post("/mountains",isLoggedIn,function(req, res) {
    // res.render("new");
    console.log(req.body);
    Mountain.create(req.body.mountain,function(err,createdMountain){
        if(err)
            console.log(err);
        else
            res.redirect("/mountains/"+createdMountain._id);
    });
});

//SHOW ROUTE
app.get("/mountains/:id",function(req, res) {
    Mountain.findById(req.params.id,function(err,shownMountain){
        if(err)
            console.log(err);
        else
            res.render("show",{mountain:shownMountain})
    });
});

//EDIT ROUTE
app.get("/mountains/:id/edit",function(req, res) {
    Mountain.findById(req.params.id,function(err,editedMountain){
        if(err)
            console.log(err);
        else
            res.render("edit",{mountain:editedMountain});
    });
});

//UPDATE ROUTE
app.put("/mountains/:id",function(req,res){
   Mountain.findByIdAndUpdate(req.params.id,req.body.mountain,function(err,updatedMountain){
        if(err)
            console.log(err);
        else
            res.redirect("/mountains/"+updatedMountain._id);
   }); 
});

//DELETE ROUTE
app.delete("/mountains/:id",function(req,res){
   Mountain.findByIdAndRemove(req.params.id,function(err){
       if(err)
            console.log(err);
        else
            res.redirect("/mountains");
   }); 
});

//REGISTER ROUTE
app.get("/register",function(req, res) {
   res.render("register"); 
});

app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err)
            return res.render("register");
        
        passport.authenticate("local")(req,res,function(){
            res.redirect("/");
        });
    });
});

//LOGIN ROUTE
app.get("/login",function(req, res) {
    res.render("login");
});

app.post("/login",passport.authenticate("local"),function(req, res) {
    res.redirect("/");
});

//LOGOUT ROUTE
app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
});

//404 HANDLER ROUTE
app.get("*",function(req,res){
    res.render("404");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect("/");
}

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server has started..."); 
});
    