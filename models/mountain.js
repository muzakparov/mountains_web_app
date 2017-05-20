
var mongoose = require("mongoose");


var mountainSchema = new mongoose.Schema({
    title:String,
    image:String,
    description:String,
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

var Mountain = mongoose.model("Mountain",mountainSchema);

module.exports = Mountain;