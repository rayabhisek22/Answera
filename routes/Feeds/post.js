var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');


//Show individual posts, answers, likes, etc
//middleware to check if answered or not
var answered = 0
function fun1(req,res,next){
	answered=0
	Question.findById(req.params.qid).populate("answer")
			.exec((err,qs)=>{
				if(err) console.log(err)
				else{
					if(qs==null)
					{
						return next()
					}
					var flag=0
					qs.answer.forEach((ans)=>{
						if(ans.userId==req.user._id){
							answered=1;
							flag=1;
							return next()
						}
					})
					if(flag==0)
						return next()
					}
				
			})
}




router.get("/:qid",fun1,(req,res,next)=>{
	Question.findById(req.params.qid).populate("answer").exec((err,qs)=>{
		if(err){
			console.log(err);
		}else{
			if(qs==null)
			{
				res.send("Wrong ID");
				return next()
			}
			User.findById(req.user,(err,u)=>{
				if(err){
					console.log(err);
				}else{
					var found=0,found1=0;
					qs.likedBy.forEach((user)=>{
						if(user==req.user._id)
							found=1;
					})
					var found1=[];
					qs.answer.forEach((ans)=>{
						var flag=0;
						ans.likedBy.forEach((user)=>{
							if(user==req.user._id){
								found1.push(1);
								flag=1;
							}
						})
						if(flag==0)
							found1.push(0);
					})
					
					res.render("./Feed/post",{question:qs,user:u,Found:found,Found1:found1,answered:answered});

				}
			})
		}
	})
})


//Post answer to question

function fun2(req,res,next){
	var user = req.user
	var flag = 0
	user.questionForYou.forEach((qs)=>{
		if(qs.qId==req.params.qid){
			flag = 1
			user.questionForYou.remove(qs);
			user.save((err,u)=>{
				if(err) console.log(err)
				else{
					console.log("1")
					return next()
				}
			})

		}
	})
	if(flag==0){
		console.log("1.1")
		return next()
	}
}

function fun3(req,res,next){
	var i=0
	Question.findById(req.params.qid,(err,qs)=>{
		if(qs.userRequested.length==0){
			console.log("2.1")
			return next()
		}
		qs.userRequested.forEach((user)=>{
			++i;
			if(user==req.user._id){
				qs.userRequested.remove(req.user._id)
				qs.save((err,q)=>{
					if(err) console.log(err)
					else{
						console.log("2")
						return next()
					}
				})
			}else{
				if(i==qs.userRequested.length){
					console.log("2.2")
					return next()
				}
			}
		})
	})

}

router.post("/:qid/:qcontent",fun2,fun3,(req,res)=>{
	var newAnswer = {
		content:req.body.content,
		userId:req.user._id,
		userName:req.user.username,
		qId:req.params.qid,
		question: req.params.qcontent
	}

	Answer.create(newAnswer,(err,ans)=>{
		if(err) console.log(err);
		else{
			Question.findById(req.params.qid,(err,qs)=>{
				if(err) console.log(err);
				else{
					qs.answer.push(ans);
					qs.save((err,q)=>{
						User.findById(req.user._id,(err,us)=>{
							if(err) console.log(err);
							else{
								us.answerId.push(ans._id);
								us.save((err,u)=>{
									if(err) console.log(err);
									else{
										res.redirect("/feeds/"+req.params.qid)
									}
								})
							}
						})
					})
				}
			})
		}
	})
})

module.exports = router;