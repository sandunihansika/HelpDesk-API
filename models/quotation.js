const { Sequelize } = require('sequelize');
const db = require('../dbConfig');

const Quotation = db.define('quotation', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
    //autoIncrement: true
  },
  customerId: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'customer',
      key: 'id'
    }
  },
  description: {
    type: Sequelize.STRING
    //allowNull: false
  },
  quotationNo: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  expiryDate: {
    type: Sequelize.DATEONLY
  },
  createdBy: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'quotation',
  timestamps: false
});

module.exports = Quotation;
