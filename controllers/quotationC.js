const db = require('../dbConfig');
const StatusCodes = require('../common/statusCode');
const Audit = require('../models/audit');
const Quotation = require('../models/quotation');

exports.addQuotation = (req, res, next) => {
  try {
    db.transaction(async t => {
      await Quotation.findAll({
          attributes: ['QuotationNo'],
          where: { QuotationNo: req.body.QuotationNo }
        },
        { transaction: t }).then(async quotation => {
        if (quotation.length > 1) {
          return res.status(200).json({
            message: 'Quotation already exist'
          });
        } else {
          const quotation = await Quotation.create({
              //ID: req.body.ID,
              CustomerID: req.body.CustomerID,
              Description: req.body.Description,
              QuotationNo: req.body.QuotationNo,
              ExpiryDate: req.body.ExpiryDate,
              CreatedBy: req.body.CreatedBy,
              PDF: req.body.buffer
            },
            { transaction: t });

          await Audit.create(
            {
              userId: '7',
              description: 'Quotation ' + quotation.getDataValue('QuotationNo') + ' quotation created'
            },
            { transaction: t }
          );
          res.status(201).json({
            messsage: 'Quotation created'
          });
        }

      }).catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Quotation could not be created'
        });
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
