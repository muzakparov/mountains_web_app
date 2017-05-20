
var express = require("express");
var passport = require("passport");
var User = require("../models/user");

var router = express.Router();

//HOME ROUTE
router.get("/",function(req,res){
    res.redirect("/mountains");
});

//REGISTER ROUTE
router.get("/register",function(req, res) {
   res.render("register"); 
});

router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err)
            return res.render("register");
        
        passport.authenticate("local")(req,res,function(){
            res.redirect("/");
        });
    });
});

//LOGIN ROUTE
router.get("/login",function(req, res) {
    res.render("login");
});

router.post("/login",passport.authenticate("local"),function(req, res) {
    res.redirect("/");
});

//LOGOUT ROUTE
router.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
});

// //404 HANDLER ROUTE
// router.get("*",function(req,res){
//     res.render("404");
// });

module.exports = router;
