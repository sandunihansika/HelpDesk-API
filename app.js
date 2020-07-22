const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
//const upload = require('./config/multer.ts');
//const PORT = process.env.PORT || 5000;
const port = 3000;
const db = require('./dbConfig');

const customer = require('./models/customer');
const quotation = require('./models/quotation');
const audit = require('./models/audit');
const upload = require('./models/upload');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
global.__basedir = __dirname;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use('/', require('./routes/customerR'));
app.use('/quotation', require('./routes/quotationR'));
app.use('/', require('./routes/uploadR'), express.static(path.join(__dirname, '/uploads')));

customer.sync();
quotation.sync();
audit.sync();
upload.sync();
