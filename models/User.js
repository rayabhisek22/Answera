var express = require('express'),
	mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var schema = mongoose.Schema;

var userSchema = new schema({
	username: String,
	password: String,
	name : String,
	scid: String,
	bio : String,
	questionId: [ String ],
	answerId: [ String ],
	followers : [ {username:String,userId:String} ],
	following : [ {username:String,userId:String} ],
	numFollowers : Number,
	numFollowing : Number,
	questionForYou : [{question:String,qId:String,userId:String,userName:String}]
	
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema); 