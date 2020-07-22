const express = require('express');
const app = express();
const router = express.Router();
const upload = require('./config/multer.ts');
//const PORT = process.env.PORT || 5000;
const port = 3000;
const db = require('./dbConfig');

const customer = require('./models/customer');
const quotation = require('./models/quotation');
const audit = require('./models/audit');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.listen(PORT, console.log(`Server started on port ${PORT}`));

//app.get('/', (req, res) => res.send('Hello World!'))


// app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//   res.send(file)
//
// })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use('/', require('./routes/customerR'));
app.use('/quotation', require('./routes/quotationR'));
app.use('/', require('./routes/auditR'));
//require('./routes/fileR')(app, router, upload);

customer.sync();
quotation.sync();
audit.sync();
