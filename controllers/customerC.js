const db = require('../dbConfig');
const Customer = require('../models/customer');

exports.addCustomer = (req,res,next) => {
  console.log("yes");
  try{
    Customer.create({
      //ID: req.body.ID,
      NIC: req.body.NIC,
      Name: req.body.Name,
      Email: req.body.Email,
      DOB: req.body.DOB,
      TelNo: req.body.TelNo,
      Address: req.body.Address,
      Gender: req.body.Gender
    }).then(result => {
      console.log(result);
      res.status(201).json({
        messsage: 'User created'
      });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }  catch (e) {
  console.log(e);
  }
}

exports.getCustomer = (req, res, next) => {

}
