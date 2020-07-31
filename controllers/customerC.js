const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Audit = require('../models/audit');
const Customer = require('../models/customer');
const Inquiry = require('../models/inquiry');
const InquiryStatus = require('../models/inquiryStatus');
const companyName = require('../controllers/companies');
const statusType = require('../controllers/statusTypes');
const inquiryType = require('../controllers/inquiryType');

exports.addCustomer = (req, res, next) => {
  try {
    db.transaction(async t => {
      await Customer.findAll(
        {
          where: { nicNumber: req.body.nicNumber }
        },
        { transaction: t }
      ).then(async (result) => {
        if (result.length >= 1) {
          return res.status(200).json(result);
        } else {
          const customer = await Customer.create(
            {
              nicNumber: req.body.nicNumber,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              telNo: req.body.telNo,
              streetAddressLineOne: req.body.streetAddressLineOne,
              streetAddressLineTwo: req.body.streetAddressLineTwo,
              city: req.body.city,
              zipCode: req.body.zipCode,
              country: req.body.country,
              gender: req.body.gender,
              handlingCompany: req.body.handlingCompany,
              type: req.body.type,
              taxNumber: req.body.taxNumber,
              ppNo: req.body.ppNo,
              companyName: req.body.companyName,
              companyRegistrationNo: req.body.companyRegistrationNo,
              vatNumber: req.body.vatNumber
            },
            { transaction: t }
          );
          if (req.body.handlingCompany == 3) {
            const inquiry = await Inquiry.create({
                customerId: customer.getDataValue('id'),
                contactPerson: req.body.contactPerson,
                designation: req.body.designation,
                contactPersonNumber: req.body.contactPersonNumber,
                description: req.body.description,
                statusId: (req.params.inquiryType == inquiryType.Quotation || req.params.inquiryType == inquiryType.Quotation_with_details) ? statusType.Need_consent : statusType.Other
              },
              { transaction: t })
              .then(result => {
                InquiryStatus.create({
                  inquiryId: result.getDataValue('id'),
                  customerId: customer.getDataValue('id'),
                  statusId: result.getDataValue('statusId'),
                  loginId: req.header.loginId
                }, { transaction: t });
              });
          } else {
            const inquiry2 = await Inquiry.create({
              customerId: customer.getDataValue('id'),
              contactPerson: req.body.contactPerson,
              designation: req.body.designation,
              contactPersonNumber: req.body.contactPersonNumber,
              description: req.body.description,
              statusId: (req.params.inquiryType == inquiryType.Quotation || req.params.inquiryType == inquiryType.Quotation_with_details) ? statusType.Send_quotation : statusType.Other
            }, { transaction: t })
              .then(result => {
                InquiryStatus.create({
                  inquiryId: result.getDataValue('id'),
                  customerId: customer.getDataValue('id'),
                  statusId: result.getDataValue('statusId'),
                  loginId: req.header.loginId
                });
              });
          }
          await Audit.create(
            {
              userId: '14223',
              description: 'Customer id ' + customer.getDataValue('id') + ' created'
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
      if (req.params.handlingCompany == companyName.Dimo_lanka) {
        Customer.findAll({ where: { handlingCompany: 2 } },
          { transaction: t })
          .then((docs) => {
            if (docs.length > 0) {
              res.status(200).json(docs);
            } else {
              res.status(200).json({
                message: 'No entries found'
              });
            }
          });
      } else {
        Customer.findAll({ where: { handlingCompany: 3 } },
          { transaction: t })
          .then((docs) => {
            if (docs.length > 0) {
              res.status(200).json(docs);
            } else {
              res.status(200).json({
                message: 'No entries found'
              });
            }
          });
      }

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

exports.getAllCustomers = (req, res, next) => {
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
    })
      .catch((err) => {
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
