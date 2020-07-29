const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Audit = require('../models/audit');
const Customer = require('../models/customer');

exports.addCustomer = (req, res, next) => {
  try {
    db.transaction(async t => {
      await Customer.findAll(
        {
          attributes: ['NIC'],
          where: { NIC: req.body.NIC }
        },
        { transaction: t }
      ).then(async (result) => {
        if (result.length >= 1) {
          const details = await Customer.findAll({
              where: { NIC: req.body.NIC }
            },
            { transaction: t });
          return res.status(200).json(details);
        } else {
          const customer = await Customer.create(
            {
              NIC: req.body.NIC,
              FirstName: req.body.FirstName,
              LastName: req.body.LastName,
              Email: req.body.Email,
              TelNo: req.body.TelNo,
              Address: req.body.Address,
              Gender: req.body.Gender,
              HandlingCompany: req.body.HandlingCompany,
              Status: req.body.Status,
              Type: req.body.Type
            },
            { transaction: t }
          );
          Customer.update(
            { Status: 'Pending' },
            { where: { NIC: req.body.NIC } },
            { transaction: t }
          );
          await Audit.create(
            {
              userId: '14223',
              description: 'Customer NIC ' + customer.getDataValue('NIC') + ' created'
            },
            { transaction: t }
          );
          res.status(201).json({
            messsage: 'User created'
          });
        }
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        messsage: 'User could not be created'
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      data: null,
      message: 'Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};

exports.getCustomer = (req, res, next) => {
  try {
    db.transaction(async t => {
      Customer.findAll({ transaction: t })
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
