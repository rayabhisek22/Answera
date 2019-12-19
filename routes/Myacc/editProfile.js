var express = require('express'); 
var router = express.Router();

var User = require('../../models/User');
var Question = require('../../models/Question');
var Answer = require('../../models/Answer');

//ROUTES========================
router.get("/",(req,res)=>{
	User.findById(req.user._id)
		.then((user,err)=>{
			if(err) console.log(err)
			else{
				res.render("./Myacc/editProfile",{user:user})
			}
		})
})

router.put("/",(req,res)=>{
	User.findByIdAndUpdate(req.user._id,req.body.User,(err,user)=>{
		if(err) console.log(err)
		else{
			res.redirect("/myacc")
		}
	})
})


module.exports = router;