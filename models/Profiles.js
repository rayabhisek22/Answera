var express = require('express'),
	mongoose = require('mongoose');

var schema = mongoose.Schema;

var profileSchema = new schema({
	user : [{
		type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
})

module.exports = mongoose.model("Profile",answerSchema); 