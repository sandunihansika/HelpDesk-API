const { Sequelize } = require('sequelize');
const db = require('../dbConfig');
const Inquiry = require('../models/inquiry');

const Customer = db.define('customer', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nicNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  telNo: {
    type: Sequelize.STRING
    //allowNull: false
  },
  streetAddressLineOne: {
    type: Sequelize.STRING
  },
  streetAddressLineTwo: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.INTEGER
  },
  zipCode: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.INTEGER
  },
  gender: {
    type: Sequelize.STRING
    //allowNull: false
  },
  handlingCompany: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.INTEGER
  },
  taxNumber: {
    type: Sequelize.STRING
  },
  ppNo: {
    type: Sequelize.STRING
  },
  companyName: {
    type: Sequelize.STRING
  },
  companyRegistrationNo: {
    type: Sequelize.STRING
  },
  vatNumber: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'customer',
  timestamps: false
});

Customer.hasMany(Inquiry);
Inquiry.belongsTo(Customer);

module.exports = Customer;
