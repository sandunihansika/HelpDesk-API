const { Sequelize } = require('sequelize');
const db = require('../dbConfig');

const Inquiry = db.define('inquiry', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'customer',
      key: 'id'
    }
  },
  contactPerson: {
    type: Sequelize.STRING
    //allowNull: false
  },
  designation: {
    type: Sequelize.STRING
  },
  contactPersonNumber: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  description: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  statusId: {
    type: Sequelize.BIGINT,
    references: {
      model: 'status',
      key: 'id'
    }
  }
}, {
  tableName: 'inquiry'
});


module.exports = Inquiry;
