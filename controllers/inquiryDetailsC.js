const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Inquiry = require('../models/inquiry');
const Customer = require('../models/customer');
const Status = require('../models/status');
const InquiryStatus = require('../models/inquiryStatus');

exports.getDetails = (req, res, next) => {
  try {
    db.transaction(async t => {
      const task = await Inquiry.findAll(
        {
          attributes: ['id', 'customerId', 'contactPerson', 'designation', 'contactPersonNumber', 'customer.firstName'],
          include: [{
            model: Customer,
            attributes: ['firstName', 'lastName', 'companyName', 'companyRegistrationNo', 'nicNumber', 'handlingCompany']
          },
            { model: Status, attributes: ['name'] }]
        }, { transaction: t });
      res.status(200).json({
        data: task,
        message: 'Inquiry details retrieved successfully',
        statusCode: StatusCodes.Success
      });
    }).then()
      .catch(err => {
          console.log(err);
          res.status(500).json({
            data: '',
            messsage: 'Cannot get inquiry details',
            statusCode: StatusCodes.DBError
          });
        }
      );

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      data: null,
      message: 'Get details server error',
      statusCode: StatusCodes.ServerError
    });
  }
};

exports.getHistory = (req, res, next) => {
  try {
    db.transaction(async t => {
      const inquiryHistory = await InquiryStatus.findAll(
        {
          where: { inquiryId: req.params.inquiryId }
        }, { transaction: t });
      res.status(200).json({
        data: inquiryHistory,
        message: 'History retrieved successfully',
        statusCode: StatusCodes.Success
      });
    }).then()
      .catch(err => {
          console.log(err);
          res.status(500).json({
            data: '',
            messsage: 'Cannot get history',
            statusCode: StatusCodes.DBError
          });
        }
      );

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      data: null,
      message: 'Get history server error',
      statusCode: StatusCodes.ServerError
    });
  }
};
