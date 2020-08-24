const { Sequelize } = require('sequelize');

module.exports = new Sequelize('helpdeskdb', 'ingenii', 'Cde#Vfr4', {
  host: '13.250.160.123',
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
    acquire: 1000000,
  }

});
