var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');


//Show individual posts, answers, likes, etc
router.get("/:qid",(req,res)=>{
	Question.findById(req.params.qid).populate("answer").exec((err,qs)=>{
		if(err){
			console.log(err);
		}else{
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
					
					res.render("./Feed/post",{question:qs,user:u,Found:found,Found1:found1});

				}
			})
		}
	})
})

//Post answer
router.post("/:qid",(req,res)=>{
	var newAnswer = {
		content:req.body.content,
		userId:req.user._id,
		userName:req.user.username
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