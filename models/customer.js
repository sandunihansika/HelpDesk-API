const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Customer = sequelize.define('Customer', {

  ID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NIC: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  DOB: {
    type: DataTypes.DATEONLY
  },
  TelNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});

console.log(Customer === sequelize.models.Customer);
