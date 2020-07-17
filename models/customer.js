const { Sequelize } = require('sequelize');
const db = require('../dbConfig');

const Customer = db.define('customer', {

  ID: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  NIC: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Name: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  Email: {
    type: Sequelize.STRING,
    // allowNull defaults to true
  },
  DOB: {
    type: Sequelize.DATEONLY
  },
  TelNo: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  Address: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  Gender: {
    type: Sequelize.STRING,
    //allowNull: false
  },
}, {
  tableName: 'customer',
  timestamps: false
});

module.exports = Customer;
