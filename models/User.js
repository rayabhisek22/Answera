var express = require('express'),
	mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var schema = mongoose.Schema;

var userSchema = new schema({
	username: String,
	password: String,
	questionId: [ String ],

	answerId: [ String ]
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema); 