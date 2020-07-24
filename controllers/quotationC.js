const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Audit = require('../models/audit');
const Quotation = require('../models/quotation');

exports.addQuotation = (req, res, next) => {
  try {
    db.transaction(async t => {
      let preList = [];
      if (req.body.QuotationNo !== '') {
        preList = await Quotation.findAll({
            where: [{ QuotationNo: req.body.QuotationNo }, { CustomerID: req.body.CustomerID }]
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
            CustomerID: req.body.CustomerID,
            Description: req.body.Description,
            QuotationNo: req.body.QuotationNo,
            ExpiryDate: req.body.ExpiryDate,
            CreatedBy: req.body.CreatedBy
          },
          { transaction: t });

        await Audit.create(
          {
            userId: '7',
            description: 'Quotation ' + quotation.getDataValue('QuotationNo') + ' quotation created'
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
