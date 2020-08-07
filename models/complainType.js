const { Sequelize} = require ('sequelize');
const db = require ('../dbConfig');
const Complain = require('../models/complain')


const ComplainType = db.define('complainType',{

	id: {
		type: Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'complainType',
	timestamps: false

});

ComplainType.hasMany(Complain);
Complain.belongsTo(ComplainType);



module.exports = ComplainType;
