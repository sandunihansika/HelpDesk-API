const Sequelize = require('sequelize');
const db = require('../dbConfig');
const Inquiry = require('../models/inquiry');
const Complain = require('../models/complain')


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

Status.hasMany(Inquiry);
Inquiry.belongsTo(Status);

Status.hasMany(Complain);
Complain.belongsTo(Status);


module.exports = Status;
