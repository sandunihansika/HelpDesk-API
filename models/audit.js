const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Audit = db.define(
  'audit',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      AllowNull: false,
      autoIncrement: true
    },
    description: {
      type: Sequelize.STRING,
      AllowNull: false

    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER
    }
  },
  {
    tableName: 'audit'
  }
);

module.exports = Audit;
