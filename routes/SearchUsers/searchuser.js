var express = require('express'); 
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
router.get("/",(req,res)=>{
	User.find({})
		.then((user,err)=>{
			if(err) console.log(err)
			else{
				res.render("SearchUsers/searchuser",{users:user,found:1})
			}
		})
})
//middleware 
var users=[],found=0
function fun1(req,res,next){
	found=0
	users=[]
	User.find({username:req.body.username})
		.then((user,err)=>{
			if(err) console.log(err)
			else{
				users=user
				if(user.length==0){	
					return next()
				}
				else{
					found=1;
					return next()
				}
			}
		})
	
}


var funarray = [fun1]
router.post("/",funarray,(req,res)=>{
	res.render("SearchUsers/searchuser",{users:users,found:found})
})

module.exports = router;