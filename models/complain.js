const { Sequelize} = require ('sequelize');
const db = require ('../dbConfig');


const Complain = db.define('complain',{

	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	customerId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'customer',
			key: 'id'
		}
	},
	contactPerson: {
		type: Sequelize.STRING
		//allowNull: false
	},
	contactPersonNumber: {
		type: Sequelize.STRING
		// allowNull defaults to true
	},
	designation: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	complainTypeId: {
		type: Sequelize.BIGINT,
		references: {
			model: 'complainType',
			key: 'id'
		}
	},
	createdAt: {
		type: Sequelize.DATE
	},
	updatedAt: {
		type: Sequelize.DATE
	},
	statusId: {
		type: Sequelize.BIGINT,
		references: {
			model: 'status',
			key: 'id'
		}
	}
}, {
	tableName: 'complain'
});




module.exports = Complain;
