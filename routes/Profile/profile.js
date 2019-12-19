var express = require('express'); 
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
var u
function fun1(req,res,next){
	u = []
	User.find({},(err,user)=>{
		if(err) console.log(err)
		else{
			u = user
			next()
		}
	})
}

var topRated
function fun2(req,res,next){
	topRated = []
	u.forEach((user)=>{
		if(user.numFollowers>1){
			topRated.push(user)
		}
	})
	console.log(topRated)
	next()
}

var funArray = [fun1,fun2]
router.get("/",funArray,(req,res)=>{
	res.render("./Profile/profile",{users:topRated})
})


module.exports = router;