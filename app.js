const express = require('express');
const app = express();
//const PORT = process.env.PORT || 5000;
const port = 3000

const bodyParser = require('body-parser');
const db = require('./dbConfig');

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


//app.use('/user', require('./api/routes/customerRoute'));
