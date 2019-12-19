var express = require('express'); 
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
router.get("/:qid",(req,res)=>{
	var user = req.user
	user.questionForYou.forEach((qs)=>{
		if(qs.qId==req.params.qid){
			user.questionForYou.remove(qs)
			user.save((err,u)=>{
				if(err) console.log(err)
				else{
					Question.findById(req.params.qid)
							.then((q,err)=>{
								if(err) console.log(err)
								else{
									q.userRequested.remove(user._id);
									q.save((err,nq)=>{
										if(err) console.log(err)
										else{
											res.redirect("/myacc")
										}
									})
								}
							})
				}
			})
		}
	})
})



module.exports = router;