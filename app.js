const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const router = express.Router();
//const upload = require('./config/multer.ts');
//const PORT = process.env.PORT || 5000;

app.use(cors());

const port = 3000;
const db = require('./dbConfig');

const customer = require('./models/customer');
const quotation = require('./models/quotation');
const audit = require('./models/audit');
const upload = require('./models/upload');
const company = require('./models/company');
const status = require('./models/status');
const inquiry = require('./models/inquiry');
const inquirystatus = require('./models/inquiryStatus');
const complaintype = require('./models/complainType');
const complain = require('./models/complain');



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
global.__basedir = __dirname;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
app.get('/', (req, res) => res.send('Hello Guyzzz.....!'));


try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use('/customer', require('./routes/customerR'));
//app.use('/quotation', require('./routes/quotationR'));
app.use('/quotation', require('./routes/quotation/uploadR'), express.static(path.join(__dirname, '/uploads')));
app.use('/company', require('./routes/companyR'));
app.use('/inquiry', require('./routes/inquiryDetailsR'));
app.use('/complain',require('./routes/complainR'));
app.use('/loginUser', require('./routes/loginR'));
app.use('/', require('./routes/auditR'));


customer.sync();
quotation.sync();
audit.sync();
upload.sync();
company.sync();
status.sync();
inquiry.sync();
inquirystatus.sync();
complaintype.sync();
complain.sync();
