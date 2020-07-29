const { Sequelize } = require('sequelize');
const db = require('../dbConfig');

const Customer = db.define('customer', {

  ID: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  NIC: {
    type: Sequelize.STRING,
    allowNull: false
  },
  FirstName: {
    type: Sequelize.STRING
  },
  LastName: {
    type: Sequelize.STRING
  },
  Email: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  TelNo: {
    type: Sequelize.STRING
    //allowNull: false
  },
  Address: {
    type: Sequelize.STRING
    //allowNull: false
  },
  Gender: {
    type: Sequelize.STRING
    //allowNull: false
  },
  HandlingCompany: {
    type: Sequelize.STRING
  },
  Status: {
    type: Sequelize.STRING
  },
  Type: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'customer',
  timestamps: false
});

module.exports = Customer;
