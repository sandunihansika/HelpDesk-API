const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Inquiry = require('../models/inquiry');
const Customer = require('../models/customer');
const Status = require('../models/status');

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
      res.status(200).json(task);
    }).then()
      .catch(err => {
          console.log(err);
          res.status(500).json({
            messsage: 'Database not responding'
          });
        }
      );

  } catch (e) {
    console.log(e);
    return res.status(200).json({
      data: null,
      message: 'Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};
