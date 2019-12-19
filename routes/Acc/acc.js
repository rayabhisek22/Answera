var express = require('express'); 
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
var q = [], a = [], user1 ={}, following=0
//Follow and Unfollow user
var followRoutes = require('./follow') 
router.use(followRoutes)


//Viewing account

//middleware function 
//for questions
function fun1(req,res,next){
	q=[]
	User.findById(req.params.accid)
		.then((user,err)=>{
			if(err) console.log(err);
			else{
				user1 = user
				if(user.questionId.length==0){
					return next()
				}
				q = []
				var i=0;
				user.questionId.forEach((question)=>{
					Question.findById(question)
							.then((qs,err)=>{
								if(err) console.log(err)
								else {
									q.push(qs);
									++i; 
									if(i==user.questionId.length){
										return next()
									}
								}
							})
				})
			}
		})
}

//for answers
function fun2(req,res,next){
	a = []
	if(user1.answerId.length==0){
		return next()
	}
	var i=0;
	user1.answerId.forEach((answer)=>{
		Answer.findById(answer)
				.then((ans,err)=>{
					if(err) console.log(err)
					else  {
						a.push(ans);
						++i;
						if(i==user1.answerId.length){
							return next()
						}
					}
				})
	})
			
}

function fun3(req,res,next){
	following = 0
	var flag = 0
	user1.followers.forEach((friend)=>{
		if(friend.userId==req.user._id){
			following=1
			flag = 1
			return next()
		}
	})
	if(!flag) return next()

}

var funArray = [fun1,fun2,fun3]
router.get("/:accid",funArray,(req,res)=>{
	if(req.params.accid==req.user._id)
		res.redirect("/myacc")
	else
		res.render("./Acc/acc",{user:user1,question:q,answer:a,following:following})
})




module.exports = router;