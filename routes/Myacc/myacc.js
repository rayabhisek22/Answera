var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
var q = [], a = [], user1 ={}

//middleware function 
//for questions
function fun1(req,res,next){
	User.findById(req.user._id)
		.then((user,err)=>{
			if(err) console.log(err);
			else{
				if(user.questionId.length==0){
					next()
				}
				user1 = user
				q = []
				var i=0;
				user.questionId.forEach((question)=>{
					Question.findById(question)
							.then((qs,err)=>{
								if(err) console.log(err)
								else {
									q.push(qs);
									++i; 
									if(i==user.questionId.length)
										next()
								}
							})
				})
			}
		})
}

//for answers
function fun2(req,res,next){
	User.findById(req.user._id)
		.then((user,err)=>{
			if(err) console.log(err);
			else{
				if(user.answerId.length==0){
					next()
				}
				a = []
				var i=0;
				user.answerId.forEach((answer)=>{
					Answer.findById(answer)
							.then((ans,err)=>{
								if(err) console.log(err)
								else  {
									a.push(ans);
									++i;
									if(i==user.answerId.length)
										next()
								}
							})
				})
			}
		})	
}

router.get("/",fun1,fun2,(req,res)=>{
	res.render("./Myacc/myacc",{user:user1,question:q,answer:a})
})


module.exports = router;