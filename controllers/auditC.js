const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Audit = require('../models/audit');

exports.getAudit = (req, res, next) => {
  try {
    db.transaction(async t => {
      Audit.findAll({ transaction: t })
        .then((docs) => {
          if (docs.length > 0) {
            res.status(200).json({
              data: docs,
              message: 'Audit report retrieved successfully',
              statusCode: StatusCodes.Success
            });
          } else {
            res.status(200).json({
              data: '',
              message: 'No entries found',
              statusCode: StatusCodes.Success
            });
          }
        });
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          data: '',
          messsage: 'Audit report generation failed',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (e) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: 'Get Audit Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};
