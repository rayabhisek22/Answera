var express = require('express'),
	mongoose = require('mongoose');

var schema = mongoose.Schema;

var questionSchema = new schema({
	content: String,
	userId: String,
	userName: String,
	likes: Number,
	likedBy : [String],
	userRequested: [String],
	answer: [{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Answer"
	}]
})

module.exports = mongoose.model("Question",questionSchema); 