const { Sequelize } = require('sequelize');

module.exports = new Sequelize('helpdeskdb', 'ingenii', 'Cde#Vfr4', {
  host: '13.250.160.123',
  dialect: 'mysql'
});
