const { Sequelize } = require('sequelize');
const db = require('../dbConfig');

const InquiryStatus = db.define('inquirystatus', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  inquiryId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'inquiry',
      key: 'id'
    }
  },
  customerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'customer',
      key: 'id'
    }
  },
  statusId: {
    type: Sequelize.BIGINT,
    references: {
      model: 'status',
      key: 'id'
    }
  },
  loginId: {
    type: Sequelize.INTEGER
  }
}, {
  tableName: 'inquirystatus',
  timestamps: true
});


module.exports = InquiryStatus;
