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
	console.log("STARTED=======================>>>>")
	q=[]
	user1 = req.user
	if(user1.questionId.length==0){
		return next()
	}
	var i=0;
	user1.questionId.forEach((question)=>{
		Question.findById(question)
				.then((qs,err)=>{
					if(err) console.log(err)
					else {
						q.push(qs);
						++i; 
						console.log("i -> "+i+" "+user1.questionId.length)
						if(i==user1.questionId.length){
							return next()
						}
					}
				})
	})

}

//for answers
function fun2(req,res,next){
	a=[]
	if(user1.answerId.length==0){
		return next()
	}
	var i=0
	user1.answerId.forEach((answer)=>{
		Answer.findById(answer)
				.then((ans,err)=>{
					if(err) console.log(err)
					else  {
						a.push(ans);
						++i;
						console.log("j -> "+i+" "+user1.answerId.length)
						if(i==user1.answerId.length){
							return next()
						}
					}
				})
	})	
}


var funArray = [fun1,fun2]
router.get("/",funArray,(req,res)=>{
	res.render("./Myacc/myacc",{user:user1,question:q,answer:a})
})


module.exports = router;