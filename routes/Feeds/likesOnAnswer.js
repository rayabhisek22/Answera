var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//Like=================================================
router.post("/:qid/:aid/like/:x",(req,res)=>{
	Answer.findById(req.params.aid,(err,ans)=>{
		if(err) console.log(err)
		else{
			var found=0;
			ans.likedBy.forEach((user)=>{
				if(user==req.user._id){
					found=1;
				}
			})	
			if(found)
				res.redirect("/feeds/"+req.params.qid);
			else{
				if(ans.likes==null){
					ans.likes=1;
					ans.likedBy.push(req.user._id);
					ans.save((err,a)=>{
						if(err) console.log(err);
						else {
							if(req.params.x!="post"){
								res.redirect("/feeds/"+req.params.qid);
							}else res.redirect("/post/"+req.params.aid)
							
						}
							
					})
				}
				else{
					ans.likes++;
					ans.likedBy.push(req.user._id);
					ans.save((err,a)=>{
						if(err) console.log(err);
						else{
							if(req.params.x!="post"){
								res.redirect("/feeds/"+req.params.qid);
							}else res.redirect("/post/"+req.params.aid)
							
						} 
							
					})
				}
			}	
		}
	})
})

//Unlike=============================================
router.post("/:qid/:aid/unlike/:x",(req,res)=>{
	Answer.findById(req.params.aid,(err,ans)=>{
		if(err) console.log(err)
		else{
			ans.likes--;
			ans.likedBy.forEach((user)=>{
				if(user==req.user._id){
					ans.likedBy.remove(user);
					ans.save((err,a)=>{
						if(err) console.log(err);
						else{
							if(req.params.x!="post"){
								res.redirect("/feeds/"+req.params.qid);
							}else res.redirect("/post/"+req.params.aid)
						} 
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
	Answer.findById(req.params.aid)
			.then((ans,err)=>{
				if(err) console.log(err);
				else{
					userId = []
					ans.likedBy.forEach((a=>{
						userId.push(a);
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

router.get("/:qid/:aid/likedBy/:x",findUserId,findUserName,mapNameAndId,(req,res)=>{
	if(req.params.x!="post"){
		res.render("./Feed/answerLikedBy",{User:user,f:0,aid:req.params.aid,qid:req.params.qid});
	}else{
		res.render("./Feed/answerLikedBy",{User:user,f:1,aid:req.params.aid,qid:req.params.qid});
	}
})


//Exports==========================
module.exports = router;