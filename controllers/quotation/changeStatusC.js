const db = require('../../dbConfig');
const StatusCodes = require('../../common/statusCode');
const Inquiry = require('../../models/inquiry');
const InquiryStatus = require('../../models/inquiryStatus');
const statusType = require('../../controllers/statusTypes');

exports.approve = (req, res, next) => {
  try {
    db.transaction(async t => {
      Inquiry.update({
          statusId: statusType.Approved_quotation
        },
        { where: { id: req.params.inquiryId } }, { transaction: t });
    }).then(async t => {
      await InquiryStatus.create({
        inquiryId: req.params.inquiryId,
        customerId: req.params.customerId,
        statusId: statusType.Approved_quotation,
        loginId: req.header('loginId')
      }, { transaction: t });
      res.status(200).json({
        message: 'Status updated successfully'
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
      message: 'Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};

exports.reject = (req, res, next) => {
  try {
    db.transaction(async t => {
      Inquiry.update({
          statusId: statusType.Reject_quotation
        },
        { where: { id: req.params.inquiryId } }, { transaction: t });
    }).then(async t => {
      await InquiryStatus.create({
        inquiryId: req.params.inquiryId,
        customerId: req.params.customerId,
        statusId: statusType.Reject_quotation,
        loginId: req.header('loginId')
      }, { transaction: t });
      res.status(200).json({
        message: 'Status updated successfully'
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
      message: 'Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};

exports.resend = (req, res, next) => {
  try {
    db.transaction(async t => {
      Inquiry.update({
          statusId: statusType.Resend_quotation
        },
        { where: { id: req.params.inquiryId } }, { transaction: t });
    }).then(async t => {
      await InquiryStatus.create({
        inquiryId: req.params.inquiryId,
        customerId: req.params.customerId,
        statusId: statusType.Resend_quotation,
        loginId: req.header('loginId')
      }, { transaction: t });
      res.status(200).json({
        message: 'Status updated successfully'
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
      message: 'Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};

exports.send = (req, res, next) => {
  try {
    db.transaction(async t => {
      Inquiry.update({
          statusId: statusType.Send_quotation
        },
        { where: { id: req.params.inquiryId } }, { transaction: t });
    }).then(async t => {
      await InquiryStatus.create({
        inquiryId: req.params.inquiryId,
        customerId: req.params.customerId,
        statusId: statusType.Send_quotation,
        loginId: req.header('loginId')
      }, { transaction: t });
      res.status(200).json({
        message: 'Status updated successfully'
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
      message: 'Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};
