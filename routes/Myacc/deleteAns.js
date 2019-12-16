var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');


//ROUTES========================
//function to remove ansId from users
function fun1(req,res,next){
	User.findById(req.user._id)
		.then((user,err)=>{
			user.answerId.remove(req.params.aid);
			user.save((err)=>{
				if(err) console.log(err);
				else {
					console.log("a1")
					next();
				}
			})
		})
}

function fun2(req,res,next){
	Answer.findById(req.params.aid)
			.then((ans,err)=>{
				if(err) console.log(err)
				else{
					Question.findById(ans.qId).populate("answer")
							.exec((err,qs)=>{
								if(err) console.log(err)
								else{
									qs.answer.remove(ans);
									qs.save((err)=>{
										if(err) console.log(err);
										else{
											console.log("a2");
											next();
										}
									})
								}
							})
				}
				
			})
}


function fun3(req,res,next){
	Answer.findByIdAndRemove(req.params.aid,(err)=>{
		if(err) console.log(err);
		else{
			console.log("a3");
			next();
		}
	})
}







var funarray = [fun1,fun2,fun3]

router.get("/x2",(req,res)=>{
	res.redirect("/myacc")
})

router.get("/:aid",funarray,(req,res)=>{
	res.redirect("/myacc/delete/ans/x2")
})


module.exports = router;

