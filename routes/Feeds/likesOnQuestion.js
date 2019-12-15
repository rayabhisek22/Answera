var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//Like=================================================
router.post("/:qid/like",(req,res)=>{
	Question.findById(req.params.qid,(err,qs)=>{
		if(err) console.log(err)
		else{
			var found=0;
			qs.likedBy.forEach((user)=>{
				if(user==req.user._id){
					found=1;
				}
			})	
			if(found)
				res.redirect("/feeds/"+req.params.qid);
			else{
				if(qs.likes==null){
					qs.likes=1;
					qs.likedBy.push(req.user._id);
					qs.save((err,q)=>{
						if(err) console.log(err);
						else res.redirect("/feeds/"+req.params.qid);
					})
				}
				else{
					qs.likes++;
					qs.likedBy.push(req.user._id);
					qs.save((err,q)=>{
						if(err) console.log(err);
						else res.redirect("/feeds/"+req.params.qid);
					})
				}
			}	
		}
	})
})

//Unlike=============================================
router.post("/:qid/unlike",(req,res)=>{
	Question.findById(req.params.qid,(err,qs)=>{
		if(err) console.log(err)
		else{
			qs.likes--;
			qs.likedBy.forEach((user)=>{
				if(user==req.user._id){
					qs.likedBy.remove(user);
					qs.save((err,q)=>{
						if(err) console.log(err);
						else res.redirect("/feeds/"+req.params.qid);
					})
				}
			})
		}
	})
})

//LikedBy============================================
var userId=[],userName=[],user=[];

//middleware functiom
function findUserId(req,res,next){
	Question.findById(req.params.qid)
			.then((qs,err)=>{
				if(err) console.log(err);
				else{
					userId = []
					qs.likedBy.forEach((us=>{
						userId.push(us);
					}))
				}
			}).then(()=>{
				console.log("A1")
				next();
			})

}

//middleware functiom
function findUserName(req,res,next){
	var i=0;
	userName=[];
	userId.forEach((id)=>{
		User.findById(id,(err,us)=>{
			if(err) console.log(err)
			else {
				userName.push(us.username);
				++i;
				if(i==userId.length){
					console.log("A2")
					next();
				}
			}
		})
	})
	
	
}

//middleware functiom
function mapNameAndId(req,res,next){
	user=[]
	for(var i=0;i<userId.length;i++)
	{
		var newUser = {
			id : userId[i],
			name : userName[i]
		}
		user.push(newUser)
	}
	console.log("A3")
	next();
}

router.get("/:qid/likedBy",findUserId,findUserName,mapNameAndId,(req,res)=>{
	res.render("./Feed/questionLikedBy",{User:user});
})


//Exports==========================
module.exports = router;