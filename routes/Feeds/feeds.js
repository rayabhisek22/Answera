var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');


//Routes
//Index, shows only question lists and form to post new question
router.get("/",(req,res)=>{
	Question.find({},(err,qs)=>{
		if(err){
			console.log(err);
		}
		else{
			res.render("./Feed/feed",{all:qs});
		}
	})
}) 

//Post question
router.post("/",(req,res)=>{
	var newQuestion={
		content: req.body.content,
		userId:req.user._id,
		userName:req.user.username
	}

	Question.create(newQuestion,(err,qs)=>{
		if(err) console.log("E1 " + err);
		else{
			User.findById(req.user._id,(err,user)=>{
				user.questionId.push(qs._id);
				user.save((err,u)=>{
					if(err) console.log("E2  "+err);
					else{
						res.redirect("/feeds/x");
					}					
				});
			})
		}
	})
})
router.get("/x",(req,res)=>{
	res.redirect("/feeds");
})




//Exports==========================
module.exports = router;