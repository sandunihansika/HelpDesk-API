const fs = require('fs');
const stream = require('stream');
const db = require('../../dbConfig');
const Upload = require('../../models/upload');
const Quotation = require('../../models/quotation');
const Customer = require('../../models/customer');
const Audit = require('../../models/audit');
const InquiryStatus = require('../../models/inquiryStatus');
const StatusCodes = require('../../common/statusCode');
const Inquiry = require('../../models/inquiry');
const statusType = require('../statusTypes');

exports.uploadPDF = (req, res, next) => {
  console.log('upload pdf working route');
  try {
    // Upload.create({
    //   type: req.file.mimetype,
    //   name: req.file.originalname,
    //   data: fs.readFileSync(__basedir + '/uploads/' + req.file.filename)
    // });
    db.transaction(async t => {
      let preList = [];
      if (req.body.quotationNo !== '') {
        preList = await Quotation.findAll({
            where: [{ quotationNo: req.body.quotationNo }, { customerId: req.body.customerId }]
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
            customerId: req.body.customerId,
            description: req.body.description,
            quotationNo: req.body.quotationNo,
            expiryDate: req.body.expiryDate,
            createdBy: req.body.createdBy
          },
          { transaction: t });

        await Inquiry.findOne({ where: { id: req.params.inquiryId } }, { transaction: t }).then(result => {
          Inquiry.update({
              statusId: statusType.Remind_customer
            },
            {
              where: { id: result.getDataValue('id') }
            }, { transaction: t });
        });

        await InquiryStatus.create({
          inquiryId: req.params.inquiryId,
          customerId: req.body.customerId,
          statusId: statusType.Remind_customer,
          loginId: req.header('loginId')
        }, { transaction: t });

        await Audit.create(
          {
            userId: req.header('loginId'),
            description: 'Quotation ' + quotation.getDataValue('quotationNo') + ' quotation created'
          },
          { transaction: t }
        );
        res.status(201).json({
          data: null,
          messsage: 'Quotation created and uploaded successfully',
          statusCode: StatusCodes.Success
        });
      }

    })
      .then()
      .catch(err => {
        console.log(err);
        res.status(500).json({
          data: '',
          message: 'Quotation could not be created',
          statusCode: StatusCodes.DBError
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
  console.log('Download pdf api IN');
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
    // let dir = `./uploads/${req.params.customerId}/quotations/${req.params.quotationNo}.pdf`;
    const dir = __basedir +`/uploads/${ req.params.customerId }/quotations/${ req.params.quotationNo }.pdf`;

    //let dir = './uploads/' + 1190 + '/quotations/' + 987 + '.pdf';
    //const { NIC } = req.body
    // if (!fs.existsSync(dir)) {
    //   res.status(200).json({
    //     data: null,
    //     message: 'Report  Not Generated!'
    //   });
    // } else {
    //   res.download(dir);
    //   console.log("Downloaded");
    // }
    res.download(dir);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      data: null,
      message: 'Report Download Validation Error'
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    db.transaction(async t => {
      Quotation.findAll({
          where: { customerId: req.params.customerId }
        },
        { transaction: t })
        .then((docs) => {
          if (docs.length > 0) {
            res.status(200).json({
              data: docs,
              message: 'Quotation retrieved successfully',
              statusCode: StatusCodes.Success
            });
          } else {
            res.status(200).json({
              data: null,
              message: 'No entries found',
              statusCode: StatusCodes.Success
            });
          }
        });
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          data: null,
          message: 'Cound not get quotation',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (e) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: 'Get all quotation error',
      statusCode: StatusCodes.ServerError
    });
  }
};
