var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//Routes

router.get("/:qid",(req,res)=>{
	User.find({},(err,user)=>{
		if(err) console.log(err)
		else{
			res.render("./Feed/requestUsers",{user:user,qid:req.params.qid,i_m_user:req.user})
		}
	})	
})

//post
//middlewares
var u={}
function fun1(req,res,next){
	u = req.user
	next()	
}

var q={};
function fun2(req,res,next){
	var id = req.body.id;
	console.log(id)
	if(id==null)
	{
		return next()
	}
	q={}
	Question.findById(req.params.qid,(err,qs)=>{
		if(err) console.log(err)
		else{
			q=qs;
			qs.userRequested=req.body.id;
			qs.save((err,q)=>{
				if(err) console.log(err)
				else{
					next();
				}
			})			
		}
	})
}

var funarray = [fun1,fun2]
router.post("/:qid",funarray,(req,res,next)=>{
	var id = req.body.id;
	if(id==null)
	{
		res.redirect("/feeds/"+req.params.qid)
		return 
	}
	var i=0;
	id.forEach((userId)=>{
		User.findById(userId)
			.then((user,err)=>{
				if(err) console.log(err)
				else{
					user.questionForYou.push({
						question:q.content,
						qId:q._id,
						userId:req.user._id,
						userName:u.username
					})
					user.save((err,u)=>{
						if(err) console.log(err)
						else {
							++i;
							if(i==id.length)
							{
								res.redirect("/feeds/"+req.params.qid)
							}
						}
					})
				}
			})
	})
})
//Exports==========================
module.exports = router;