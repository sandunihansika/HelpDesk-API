const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Audit = require('../models/audit');
const Quotation = require('../models/quotation');
const Customer = require('../models/customer');

exports.addQuotation = (req, res, next) => {
  try {
    db.transaction(async t => {
      let preList = [];
      if (req.body.quotationNo !== '') {
        preList = await Quotation.findAll({
            where: [{ quotationNo: req.body.quotationNo }, { customerID: req.body.customerID }]
          },
          { transaction: t });
      }
      if (preList.length > 0) {
        return res.status(200).json({
          data: null,
          message: 'Quotation Exists!',
          statusCode: StatusCodes.ServerError
        });
      } else {
        const quotation = await Quotation.create({
            //ID: req.body.ID,
            customerID: req.body.customerID,
            description: req.body.description,
            quotationNo: req.body.quotationNo,
            expiryDate: req.body.expiryDate,
            createdBy: req.body.createdBy
          },
          { transaction: t });
        // Customer.findOne({ where: {HandlingCompany: 'Ingenii', ID:req.body.CustomerID} }).then(function(Customer) {
        //   Customer.update(
        //     { Status: 'Need Consent' },
        //     { where: { ID: req.body.CustomerID }},
        //     { transaction: t }
        //   );
        // })
        Customer.findOne({ where: { ID: req.body.customerID } }).then(function(Customer) {
          if (Customer.handlingCompany == 'Ingenii') {
            Customer.update(
              { Status: 'Need Consent' },
              { where: { ID: req.body.customerID } },
              { transaction: t }
            );
          } else {
            Customer.update(
              { Status: 'Quotation Sent' },
              { where: { ID: req.body.customerID } },
              { transaction: t }
            );
          }

        });

        await Audit.create(
          {
            userId: '7',
            description: 'Quotation ' + quotation.getDataValue('quotationNo') + ' quotation created'
          },
          { transaction: t }
        );
        res.status(200).json({
          message: 'Quotation created successfully!'
        });
      }

    })
      .then()
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Quotation could not be created'
        });
      });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      data: null,
      message: 'Quotation Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};

exports.getQuotation = (req, res, next) => {
  try {
    db.transaction(async t => {
      Quotation.findAll({ transaction: t })
        .then((docs) => {
          if (docs.length > 0) {
            res.status(200).json(docs);
          } else {
            res.status(200).json({
              message: 'No entries found'
            });
          }
        });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        messsage: 'Database not responding'
      });
    });
  } catch (e) {
    console.log(error);
    return res.status(200).json({
      data: null,
      message: 'Quotation Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};
