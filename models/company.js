const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Company = db.define(
  'company',
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
    tableName: 'company',
    timestamps: false
  }
);

module.exports = Company;
