module.exports = (app, router, upload) => {
  const fileWorker = require('../controllers/fileC');

  // var path = __basedir + '/views/';
  //
  // router.use((req,res,next) => {
  //   console.log("/" + req.method);
  //   next();
  // });
  //
  // app.get('/', (req,res) => {
  //   res.sendFile(path + "index.html");
  // });

  app.post('/upload', upload.single('Fileupload'), fileWorker.uploadFile);
  app.get('/getall', fileWorker.listAllFiles);
  app.get('/:id', fileWorker.downloadFile);

  //app.use('/',router);

  // app.get('/api/files/getall', fileWorker.listAllFiles);
  //
  // app.get('/api/files/:id', fileWorker.downloadFile);
  //
  // app.use('/',router);
  //
  // app.use('*', (req,res) => {
  //   res.sendFile(path + "404.html");
  // });
};
