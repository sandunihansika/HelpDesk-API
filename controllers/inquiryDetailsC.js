const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Inquiry = require('../models/inquiry');
const Customer = require('../models/customer');
const Status = require('../models/status');
const InquiryStatus = require('../models/inquiryStatus');
const sequelize = require('sequelize');
const Op = require('sequelize');

exports.getDetails = (req, res, next) => {
  try {
    db.transaction(async t => {
      const task = await Inquiry.findAll(
        {
          attributes: ['id', 'customerId', 'contactPerson', 'designation', 'contactPersonNumber', 'customer.firstName', 'statusId', 'updatedAt'],
          include: [{
            model: Customer,
            attributes: ['firstName', 'lastName', 'companyName', 'companyRegistrationNo', 'nicNumber', 'handlingCompany', 'telNo']
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
          where: { inquiryId: req.params.inquiryId },
          include: { model: Status, attributes: ['name'] }
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

exports.getStatusCount = (req, res, next) => {
  try {
    db.transaction(async t => {
      const statusCount = await Inquiry.findAll({
        attributes: ['statusId', [sequelize.fn('count', 'Inquiry.statusId'), 'count']],
        group : ['Inquiry.statusId']
      }, { transaction: t }).then();
      res.status(200).json({
        data: statusCount,
        message: 'Status count retrieved successfully',
        statusCode: StatusCodes.Success
      });
    }).then()
      .catch(err => {
          console.log(err);
          res.status(500).json({
            data: '',
            messsage: 'Cannot get count',
            statusCode: StatusCodes.DBError
          });
        }
      );
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      data: null,
      message: 'Get status server error',
      statusCode: StatusCodes.ServerError
    });
  }
}

exports.getDateCount = (req, res, next) => {
  try {
    db.transaction(async t => {
      const dateCount = await Inquiry.findAll({
        // attributes: [
        //   [ sequelize.fn('date_trunc', 'day', sequelize.col('updated_at')), 'day'],
        //   [ sequelize.fn('count', '*'), 'count']
        // ],
        // group: 'day'
        // order: [[sequelize.literal('"createdOn"'), 'ASC']],
        // group: 'createdOn'

        attributes: [ [sequelize.fn('count', 'Inquiry.createdAt'), 'count']],
        // group : 'MONTH(Inquiry.createdAt)',
        where: {
          createdAt: {
            [Op.like]: '%30',
          }
        }
        // attributes: [
        //   [
        //     sequelize.fn('strftime', '%Y-%m-%d', sequelize.col('Inquiry.createdAt')),
        //     'date'
        //   ],
        //   [sequelize.fn('count','*'),'count']
        // ],
        // group: [sequelize.col('date')],
        // where: {
        //   start_date: {
        //     [Op.gte]: new Date("2020-09-01"),
        //     [Op.lt]: new Date("2020-05-31")
        //   }
        // }

      }, { transaction: t }).then();
      res.status(200).json({
        data: dateCount,
        message: 'Status count retrieved successfully',
        statusCode: StatusCodes.Success
      });
    }).then()
      .catch(err => {
          console.log(err);
          res.status(500).json({
            data: '',
            messsage: 'Cannot get count',
            statusCode: StatusCodes.DBError
          });
        }
      );
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      data: null,
      message: 'Get status server error',
      statusCode: StatusCodes.ServerError
    });
  }
}
