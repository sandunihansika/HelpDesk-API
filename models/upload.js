const { Sequelize } = require('sequelize');
const db = require('../dbConfig');

const Fileupload = db.define('fileupload', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  data: {
    type: Sequelize.BLOB('long')
  }

}, {
  tableName: 'fileupload',
  timestamps: false
});

module.exports = Fileupload;
