
var express = require("express");
var router = express.Router();
var Comment = require("../models/mountain");

//INDEX ROUTE
// router.get("/mountains",function(req,res){
//     Mountain.find({},function(err,foundMountains){
//         if(err)
//             console.log(err);
//         else
//             res.render("index",{mountains:foundMountains});
//     });
// });

//NEW ROUTE
router.get("/mountains/:id/new",isLoggedIn,function(req, res) {
    res.render("comments/new",{mountain_id:req.params.id});
});

// CREATE ROUTE
router.post("/mountains/:id",isLoggedIn,function(req, res) {
    Comment.create(req.body.comment,function(err,createdComment){
        if(err)
            console.log(err);
        else
            res.redirect("/mountains/"+req.params.id);
    });
});

// //SHOW ROUTE
// router.get("/mountains/:id",function(req, res) {
//     Mountain.findById(req.params.id,function(err,shownMountain){
//         if(err)
//             console.log(err);
//         else
//             res.render("mountains/show",{mountain:shownMountain})
//     });
// });

// //EDIT ROUTE
// router.get("/mountains/:id/edit",function(req, res) {
//     Mountain.findById(req.params.id,function(err,editedMountain){
//         if(err)
//             console.log(err);
//         else
//             res.render("mountains/edit",{mountain:editedMountain});
//     });
// });

// //UPDATE ROUTE
// router.put("/mountains/:id",function(req,res){
//   Mountain.findByIdAndUpdate(req.params.id,req.body.mountain,function(err,updatedMountain){
//         if(err)
//             console.log(err);
//         else
//             res.redirect("/mountains/"+updatedMountain._id);
//   }); 
// });

// //DELETE ROUTE
// router.delete("/mountains/:id",function(req,res){
//   Mountain.findByIdAndRemove(req.params.id,function(err){
//       if(err)
//             console.log(err);
//         else
//             res.redirect("/mountains");
//   }); 
// });

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect("/");
}

module.exports = router;