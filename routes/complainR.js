const express = require('express');
const router = express.Router();
const complainDetails = require('../controllers/complainC')

// router.get('/gethel',(req,res)=>{
// 	res.send("hello thilini");
// })

router.get('/complainDetails',complainDetails.getDetails);
router.post('/changeComplainStatus',complainDetails.updateComplainStatus);
router.get('/viewDetails/:customerId',complainDetails.getComplainDetails);
router.post('/addComplain',complainDetails.addComplain);

module.exports = router;
