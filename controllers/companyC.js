const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Audit = require('../models/audit');
const Company = require('../models/company');

exports.getCompany = (req, res, next) => {
  try {
    db.transaction(async t => {
      Company.findAll({ transaction: t })
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
      message: 'Customer Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};
