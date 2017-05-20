
var mongoose = require("mongoose");


var mountainSchema = new mongoose.Schema({
    title:String,
    image:String,
    description:String
});

var Mountain = mongoose.model("Mountain",mountainSchema);

module.exports = Mountain;