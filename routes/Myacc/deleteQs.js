var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
//middleware function to delete QsId from User
function fun1(req,res,next){
	User.findById(req.user._id)
		.then((user,err)=>{
			if(err) console.log(err)
			else{
				user.questionId.remove(req.params.qid);
				user.save((err,u)=>{
					if(err) console.log(err)
					else {
						console.log("n1")
						next()
					}
				})
			}
		})	
}
 
//function to remove ansId from users
var user = [], user1 = []
function fun2(req,res,next){
	Question.findById(req.params.qid).populate("answer").exec((err,qs)=>{
		user = []
		user1 = []
		qs.answer.forEach((ans)=>{
			var temp={
				userId:ans.userId,
				ansId:ans._id
			}
			user.push(temp)
		})
		qs.userRequested.forEach((user)=>{
			user1.push(user);
		})
		console.log("n2")
		next()
	})
}

function fun3(req,res,next){
	var i=0;
	if(user.length==0)
		return next()
	
	user.forEach((us)=>{
		User.findById(us.userId)
			.then((u,err)=>{
				if(err) console.log(err)
				else{
					u.answerId.remove(us.ansId);
					console.log(u.answerId); //Check if removed
					u.save((err)=>{
						if(err) console.log(err)
						else{
							++i;
							if(i==user.length){
								console.log("n3")
								return next()
							}
						}
					})
				}
			})
	})
}

//remove questionForYou from all requested users
function fun4(req,res,next){
	var i=0;
	console.log(user1)
	if(user1.length==0){
		console.log("AA")
		return next()
	}
	user1.forEach((user)=>{
		User.findById(user)
			.then((us,err)=>{
				us.questionForYou.forEach((qs)=>{
					if(qs.qId==req.params.qid)
					{
						us.questionForYou.remove(qs);
						us.save((err,u)=>{
							if(err) console.log(err)
							else{
								++i;
								if(i==user1.length){
									console.log("AA")
									next();
								}
							}
						})
					}
				})
			})
	})
}

//Function to remove answers from qs
var ansId = []
function fun5(req,res,next){
	Question.findById(req.params.qid).populate("answers")
			.exec((err,qs)=>{
				if(err) console.log(err)
				else{
					ansId = []
					qs.answer.forEach((ans)=>{
						ansId.push(ans._id)
					})
					console.log("n4")
					next()
				}
			})
}

function fun6(req,res,next){
	var i=0;
	//ansId.push("1111")
	if(ansId.length==0)
		return next()

	ansId.forEach((ans)=>{
		Answer.findByIdAndRemove(ans,(err)=>{
			if(err) console.log(err);
			else{
				++i;
				if(i==ansId.length){
					console.log("n5")
					next()
				}
			}
		})
	})
}

//Function to remove question
function fun7(req,res,next){
	Question.findByIdAndRemove(req.params.qid,(err)=>{
		if(err) console.log(err);
		else {
			console.log("n6")
			next();
			
		}
	})
}

var funarray = [fun1,fun2,fun3,fun4,fun5,fun6,fun7]

router.get("/x1",(req,res)=>{
	res.redirect("/myacc")
})

router.get("/:qid",funarray,(req,res)=>{
	res.redirect("/myacc/delete/qs/x1")
})


module.exports = router;

