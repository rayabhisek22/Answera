var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
//middleware function to update ans
function fun1(req,res,next){
	Answer.findByIdAndUpdate(req.params.aid,req.body.Answer,(err,updatedAns)=>{
		if(err) console.log(err);
		else{
			next();
		}
	})

}


var funarray = [fun1]

router.get("/x1",(req,res)=>{
	res.redirect("/myacc")
})

router.get("/:aid",(req,res)=>{
	Answer.findById(req.params.aid)
			.then((ans,err)=>{
				if(err) console.log(err)
				else{
					res.render("./Myacc/editAns",{ans:ans})
				}
			})
})

router.put("/:aid",funarray,(req,res)=>{
	res.redirect("/post/"+req.params.aid)
})


module.exports = router;

