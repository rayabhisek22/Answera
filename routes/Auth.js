var express = require('express'),
	passport = require('passport'),
	LocalStrategy = require('passport-local');
	
var router = express.Router();

var User = require('../models/User');

//PASSPORT CONFIGURATION===========
router.use(require('express-session')({
  secret: "Mogambo!",
  resave: false,
  saveUninitialized: false
}))

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();  
});

//AUTH ROUTES===================
router.get("/acc",isLoggedIn,(req,res)=>{
	res.render("./acc",{currentUser:req.user});
})

//login
router.get("/login",(req,res)=>{
	res.render("login");
})
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/acc",
		failureRedirect: "/login"
	}),(req,res)=>{

})


//register
router.get("/register",(req,res)=>{
	res.render("register");
})

router.post("/register",(req,res)=>{
	var newUser = new User({
		username : req.body.username
		});

	  User.register(newUser,req.body.password,function(err,user){
	    if(err){
	      console.log(err);
	      res.render("register");
	    }else{
	      	passport.authenticate("local")(req,res,function(){
	        res.redirect("/acc");
	      })
	    }
	})
})


//logout
router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/")
})

//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;