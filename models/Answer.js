var express = require('express'),
	mongoose = require('mongoose');

var schema = mongoose.Schema;

var answerSchema = new schema({
	content: String,
	qId: String,
	question: String,
	userId: String,
	userName: String,
	likes: Number,
	likedBy : [String]
})

module.exports = mongoose.model("Answer",answerSchema); 