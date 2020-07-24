const { Sequelize } = require('sequelize');
const db = require('../dbConfig');

const Quotation = db.define('quotation', {

  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true
    //autoIncrement: true
  },
  CustomerID: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'customer',
      key: 'ID'
    }
  },
  Description: {
    type: Sequelize.STRING
    //allowNull: false
  },
  QuotationNo: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  ExpiryDate: {
    type: Sequelize.DATEONLY
  },
  CreatedBy: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'quotation',
  timestamps: false
});

module.exports = Quotation;
