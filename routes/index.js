var express = require('express');
	
var router = express.Router();


//ROUTES========================
//Authentication
//Login Page
router.get("/",(req,res)=>{
	res.render("index");
})

var authRoutes = require('./Auth');
router.use(authRoutes);

//Features
var acc = require('./Acc/acc');
var myaccRoutes = require('./Myacc/index');
var feedsRoutes = require('./Feeds/index');
var postRoutes = require('./Post/post');
var searchuserRoutes = require('./SearchUsers/searchuser')
var profileRoutes = require('./Profile/profile')

router.use("/acc",isLoggedIn,acc);
router.use("/myacc",isLoggedIn,myaccRoutes);
router.use("/feeds",isLoggedIn,feedsRoutes);
router.use("/post",isLoggedIn,postRoutes);
router.use("/searchuser",isLoggedIn,searchuserRoutes);
router.use("/profile",isLoggedIn,profileRoutes);


//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


//Export=============================
module.exports = router;