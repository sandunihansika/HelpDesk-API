const Sequelize = require('sequelize');
const db = require('../dbConfig');
const Inquiry = require('../models/inquiry');
const Complain = require('../models/complain');
const InquiryStatus = require('../models/inquiryStatus');


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

Status.hasMany(InquiryStatus);
InquiryStatus.belongsTo(Status);

module.exports = Status;
