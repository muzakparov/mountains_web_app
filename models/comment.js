
var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content:String,
    authro:String
});

var Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;

