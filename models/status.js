const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Status = db.define(
  'status',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      AllowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      AllowNull: false

    }
  },
  {
    tableName: 'status',
    timestamps: false
  }
);

module.exports = Status;
