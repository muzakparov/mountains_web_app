
var express = require("express");
var router = express.Router();
var Mountain = require("../models/mountain");

//INDEX ROUTE
router.get("/mountains",function(req,res){
    Mountain.find({},function(err,foundMountains){
        if(err)
            console.log(err);
        else
            res.render("index",{mountains:foundMountains});
    });
});

//NEW ROUTE
router.get("/mountains/new",isLoggedIn,function(req, res) {
    res.render("mountains/new");
});

//CREATE ROUTE
router.post("/mountains",isLoggedIn,function(req, res) {
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
router.get("/mountains/:id",function(req, res) {
    Mountain.findById(req.params.id,function(err,shownMountain){
        if(err)
            console.log(err);
        else
            res.render("mountains/show",{mountain:shownMountain})
    });
});

//EDIT ROUTE
router.get("/mountains/:id/edit",function(req, res) {
    Mountain.findById(req.params.id,function(err,editedMountain){
        if(err)
            console.log(err);
        else
            res.render("mountains/edit",{mountain:editedMountain});
    });
});

//UPDATE ROUTE
router.put("/mountains/:id",function(req,res){
   Mountain.findByIdAndUpdate(req.params.id,req.body.mountain,function(err,updatedMountain){
        if(err)
            console.log(err);
        else
            res.redirect("/mountains/"+updatedMountain._id);
   }); 
});

//DELETE ROUTE
router.delete("/mountains/:id",function(req,res){
   Mountain.findByIdAndRemove(req.params.id,function(err){
       if(err)
            console.log(err);
        else
            res.redirect("/mountains");
   }); 
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect("/");
}

module.exports = router;