var express = require('express');
var router = express.Router();

//ROUTES========================

//request user
var requestUsers = require('./requestUsers')
router.use("/requestUsers",requestUsers)

//Likes on Questions (All features of likes)
var likesOnQuestionRoutes = require('./likesOnQuestion');
router.use("/qs",likesOnQuestionRoutes);

//Likes on Answers (All features of likes)
var likesOnAnswerRoutes = require('./likesOnAnswer');
router.use("/ans",likesOnAnswerRoutes);

//Index (Shows Questions and posts)
var feedsRoutes = require('./feeds');
router.use(feedsRoutes);

//Show===============(posts)
var postRoutes = require('./post')
router.use(postRoutes);


//Exports======================
module.exports = router;