var express = require('express');
var router = express.Router();

//ROUTES========================

//Likes on Questions (All features of likes)
var likesOnQuestionRoutes = require('./likesOnQuestion');
router.use("/qs",likesOnQuestionRoutes);

//Likes on Answers (All features of likes)
var likesOnAnswerRoutes = require('./likesOnAnswer');
router.use("/ans",likesOnAnswerRoutes);

//Index (Shows Questions and posts)
var indexRoutes = require('./index');
router.use(indexRoutes);

//Show===============(posts)
var postRoutes = require('./post')
router.use(postRoutes);


//Exports======================
module.exports = router;