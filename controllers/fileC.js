const stream = require('stream');
const Fileupload = require('../models/upload');
const fs = require('fs');


exports.uploadFile = (req, res) => {
  Fileupload.create({
    type: req.file.mimetype,
    name: req.file.originalname
    //PDF: req.file.buffer
  }).then(() => {
    res.send('File uploaded successfully!');
  });
};

exports.listAllFiles = (req, res) => {
  Fileupload.findAll({ attributes: ['id', 'PDF'] }).then(files => {
    res.json(files);
  });
};

exports.downloadFile = (req, res) => {
  console.log('hi...........');
  Fileupload.findByPk(req.params.id).then(file => {
    const fileContents = Buffer.from(file.PDF, 'base64');
    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set('Content-disposition', 'attachment; filename=' + file.name);
    res.set('Content-Type', file.type);

    readStream.pipe(res);
  });
};
