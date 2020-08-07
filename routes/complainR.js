const express = require('express');
const router = express.Router();
const complainDetails = require('../controllers/complainC')

// router.get('/gethel',(req,res)=>{
// 	res.send("hello thilini");
// })

router.get('/complainDetails',complainDetails.getDetails)


module.exports = router;
