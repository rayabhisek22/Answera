var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
//middleware to change content of qs in Question Model
function fun1(req,res,next){
	Question.findByIdAndUpdate(req.params.qid,req.body.Question,(err,qs)=>{
		if(err) console.log(err)
		else{
			next()
		}
	})
}

//function to change question in each answer db
function fun2(req,res,next){
	var i=0;
	Question.findById(req.params.qid).populate("answer").exec((err,qs)=>{
		if(qs.answer.length==0)
			return next()
		qs.answer.forEach((ans)=>{
			ans.question=qs.content;
			ans.save((err,a)=>{
				if(err) console.log(err)
				else{
					++i;
					if(i==qs.answer.length){
						next()
					}
				}
			})
		})
	})
}

var funarray = [fun1,fun2]

router.get("/x1",(req,res)=>{
	res.redirect("/myacc")
})

router.get("/:qid",(req,res)=>{
	Question.findById(req.params.qid)
			.then((qs,err)=>{
				if(err) console.log(err)
				else{
					res.render("./Myacc/editQs",{qs:qs})
				}
			})
})

router.put("/:qid",funarray,(req,res)=>{
	res.redirect("/myacc/update/qs/x1")
})


module.exports = router;

