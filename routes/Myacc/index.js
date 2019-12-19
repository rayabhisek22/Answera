var express = require('express');
var router = express.Router();


//ROUTES========================
//myacc
var myaccRoutes = require('./myacc')
router.use(myaccRoutes);

//deleteRequest
var deleteRequestRoutes = require('./deleteRequest')
router.use("/deleteRequest",deleteRequestRoutes)

//edit profile
var editProfileRoutes = require('./editProfile')
router.use("/editProfile",editProfileRoutes)

//delete answers
var deleteAnsRoutes = require('./deleteAns')
router.use("/delete/ans", deleteAnsRoutes);

//delete questions
var deleteQsRoutes = require('./deleteQS')
router.use("/delete/qs", deleteQsRoutes);

//update questions
var updateQsRoutes = require('./updateQs')
router.use("/update/qs", updateQsRoutes)

//update answers
var updateAnsRoutes = require('./updateAns')
router.use("/update/ans", updateAnsRoutes)

module.exports = router;