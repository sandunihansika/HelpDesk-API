const Sequelize = require('sequelize');

const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Audit = require('../models/audit');
const axios = require('axios');
exports.getAudit = (req, res, next) => {
  try {
    // axios.get('http://13.251.96.119:5001/userDetails', {
    //   params: {
    //
    //   }
    // })
    //   .then( result => {
    //     res.status(200).json({
    //       data: result,
    //       message: 'User names retrieved successfully',
    //       statusCode: StatusCodes.Success
    //     })
    //   })
    //   .catch(e => {
    //     res.status(200).json({
    //       data: '',
    //       message: 'User names cannot be retrieved',
    //       statusCode: StatusCodes.ServerError
    //     })
    //   });
    db.transaction(async t => {
      const audit = await Audit.findAll(
        { attributes: [Sequelize.fn('DISTINCT', Sequelize.col('userId')), 'userId'] },
        { transaction: t })
        .then((docs) => {
          if (docs.length > 0) {
            // res.status(200).json({
            //   data: docs,
            //   message: 'Audit report retrieved successfully',
            //   statusCode: StatusCodes.Success
            // });
            axios.get('http://13.251.96.119:5001/userDetails', {
              params: { docs }
            })
              .then(result => {
                res.status(200).json({
                  data: result,
                  message: 'User names retrieved successfully',
                  statusCode: StatusCodes.Success
                });
              })
              .catch(e => {
                res.status(200).json({
                  data: '',
                  message: 'User names cannot be retrieved',
                  statusCode: StatusCodes.ServerError
                });
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
