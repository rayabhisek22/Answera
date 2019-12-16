var express = require('express');
var router = express.Router();


//ROUTES========================
//myacc
var myaccRoutes = require('./myacc')
router.use(myaccRoutes);

//delete answers
var deleteAnsRoutes = require('./deleteAns')
router.use("/delete/ans", deleteAnsRoutes);

//delete questions
var deleteQsRoutes = require('./deleteQS')
router.use("/delete/qs", deleteQsRoutes);

//update
var updateRoutes = require('./update')
//router.use("/update", updateRoutes)

module.exports = router;