const fs = require('fs');
const stream = require('stream');
const db = require('../dbConfig');
const Upload = require('../models/upload');


exports.uploadPDF = (req, res, next) => {
  try {
    // Upload.create({
    //   type: req.file.mimetype,
    //   name: req.file.originalname,
    //   data: fs.readFileSync(__basedir + '/uploads/' + req.file.filename)
    // });

    return res.status(201).json({
      message: 'File uploded successfully'
    });
  } catch (error) {
    console.error(error);
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
    //let dir = `./uploads/${NIC}/quotations/1595408709020.jpg`;
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
