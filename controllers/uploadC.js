const fs = require('fs');
const stream = require('stream');
const db = require('../dbConfig');
const Upload = require('../models/upload');
const Quotation = require('../models/quotation');
const Audit = require('../models/audit');


exports.uploadPDF = (req, res, next) => {
  try {
    // Upload.create({
    //   type: req.file.mimetype,
    //   name: req.file.originalname,
    //   data: fs.readFileSync(__basedir + '/uploads/' + req.file.filename)
    // });
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
          res.status(201).json({
            messsage: 'Quotation created and uploaded successfully'
          });
        }

      }).catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Quotation could not be created'
        });
      });
    });


    // return res.status(201).json({
    //   message: 'File uploded successfully'
    // });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload files`);
  }
};

exports.downloadPDF = async (req, res, next) => {
  // Upload.findByPk(req.params.id).then(file => {
  //   const fileContents = Buffer.from(file.data, 'base64');
  //   const readStream = new stream.PassThrough();
  //   readStream.end(fileContents);
  //
  //   res.set('Content-disposition', 'attachment; filename=' + file.name);
  //   res.set('Content-Type', file.type);
  //
  //   readStream.pipe(res);
  // });
  try {
    let dir = './uploads/' + req.body.id + '/quotations/' + req.body.QuotationNo + '.pdf';
    //const { NIC } = req.body
    if (!fs.existsSync(dir)) {
      res.status(200).json({
        data: null,
        message: 'Report  Not Generate!'
      });
    } else {
      res.download(dir);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      data: null,
      message: 'Report Download Validation Error'
    });
  }
};
