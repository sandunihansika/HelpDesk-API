const db = require('../dbConfig');
const StatusCode = require('../common/statusCode');
const Customer = require('../models/customer');
const Status = require('../models/status');
const Complain = require('../models/complain');
const ComplainType = require('../models/complainType');

exports.getDetails = (req,res,next)=>{
	try{
		db.transaction(async t=>{
			const data = await Complain.findAll({
				attributes : ['id', 'customerId', 'contactPerson',  'contactPersonNumber','designation','description', 'customer.firstName'],
				include : [{
					model : Customer,
					attributes: ['firstName', 'companyName','handlingCompany']
				},
					{
						model : Status,
						attributes : ['name']
					},
					{
						model : ComplainType,
						attributes : ['name']
					}
				]
			})
			res.status(200).json(data);
		})
			.then()
			.catch(err=>{
				console.log(err)
				res.status(500).json({
					message : 'Database is not responding'
				})
			})

	}
	catch (e) {
		console.log(e);
		return res.status(200).json({
			data: null,
			message: 'Server Error',
			statusCode: StatusCode.ServerError
		});
	}
}
