var express = require('express'); 
var router = express.Router(); 

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
var q = [], a = [], myacc={},acc={}, friend=0
//Follow
router.get("/follow/:accid",(req,res)=>{
	User.findById(req.params.accid)
		.then((acc,err)=>{
			if(err) console.log(err)
			else{
				User.findById(req.user._id)
					.then((myacc,err)=>{
						if(err) console.log(err)
						else{
							if(acc.numFollowers==null)
								acc.numFollowers=1;
							else acc.numFollowers++;
							acc.followers.push({username:myacc.username,userId:myacc._id})
							acc.save((err,a)=>{
								if(err) console.log(err)
								else {
									if(myacc.numFollowing==null)
										myacc.numFollowing=1;
									else myacc.numFollowing++;
									myacc.following.push({username:acc.username,userId:acc._id})
									myacc.save((err,ma)=>{
										if(err) console.log(err)
										else{
											res.redirect("/acc/"+req.params.accid)
										}
									})
								}
							})
						}
					})
			}
		})
})


//Unfollow
function fun1(req,res,next){
	User.findById(req.params.accid)
		.then((acc1,err)=>{
			if(err) console.log(err)
			else{
				User.findById(req.user._id)
					.then((myacc1,err)=>{
						if(err) console.log(err)
						else{
							myacc=myacc1
							acc=acc1
							next()
						}
					})
			}
		})
}

function fun2(req,res,next){
	acc.followers.forEach((user)=>{
		if(user.userId==myacc._id){
			acc.numFollowers--;
			acc.followers.remove(user._id)
			acc.save((err,a)=>{
				if(err) console.log(err);
				else{
					next()
				}
			})
		}
	})
}

function fun3(req,res,next){
	myacc.following.forEach((user)=>{
		if(user.userId==acc._id){
			myacc.numFollowing--;
			myacc.following.remove(user._id)
			myacc.save((err,a)=>{
				if(err) console.log(err);
				else{
					next()
				}
			})
		}
	})
}


var funarray = [fun1,fun2,fun3]
router.get("/unfollow/:accid",funarray,(req,res)=>{
	res.redirect("/acc/"+req.params.accid)
})
//following
router.get("/following/:accid",(req,res)=>{
	User.findById(req.params.accid)
		.then((acc,err)=>{
			if(err) console.log(err)
			else{	
				res.render("./Acc/following",{user:acc})
			}
		})
})
//followers
router.get("/followers/:accid",(req,res)=>{
	User.findById(req.params.accid)
		.then((acc,err)=>{
			if(err) console.log(err)
			else{	
				res.render("./Acc/followers",{user:acc})
			}
		})
})

module.exports = router;