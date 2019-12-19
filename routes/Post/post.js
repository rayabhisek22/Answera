var express = require('express'); 
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
var answer={},found=0
//middleware function to get the answer
function fun1(req,res,next){
	answer = {}
	Answer.findById(req.params.aid)
			.then((ans,err)=>{
				if(err) console.log(err)
				else{
					answer=ans
					return next()
				}
			})
}

//to handle likes
function fun2(req,res,next){
	found=0
	answer.likedBy.forEach((user)=>{
		if(user==req.user._id){
			found=1
			return next()
		}
	})
	return next()
}

//to check the user
var i_m_user = 0
function fun3(req,res,next){
	i_m_user = 0
	if(answer.userId==req.user._id){
		i_m_user = 1
		return next()
	}
	return next()
}

var funArray = [fun1,fun2,fun3]
router.get("/:aid",funArray,(req,res)=>{
	res.render("./Post/post",{answer:answer,found:found,i_m_user:i_m_user})
})


module.exports = router;