var express                 = require("express"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local").Strategy,
    User                    = require("./models/user"),
    Mountain                = require("./models/mountain"),
    indexRoute              = require("./routes/index"),
    mountainRoute           = require("./routes/mountains"),
    commentRoute            = require("./routes/comments");

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

app.use(indexRoute);
app.use(mountainRoute);
app.use(commentRoute);

app.set("view engine","ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server has started..."); 
});