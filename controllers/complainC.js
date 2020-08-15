const db = require('../dbConfig');
const StatusCode = require('../common/statusCode');
const Customer = require('../models/customer');
const Status = require('../models/status');
const Complain = require('../models/complain');
const ComplainType = require('../models/complainType');
const statusType = require('../controllers/statusTypes');
const Audit = require('../models/audit');
const sequelize = require('sequelize');
const StatusCodes = require('../common/statusCode');

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
		return res.status(500).json({
			data: null,
			message: 'Server Error',
			statusCode: StatusCode.ServerError
		});
	}
}

//update complain status
exports.updateComplainStatus = (req,res,next)=>{
	console.log(req.body.id, req.body.statusId)
		try{
			db.transaction(async t=>{
				await Complain.update({statusId : req.body.statusId},{
					where :{id : req.body.id}
				},{transaction : t});
				res.status(200).json({
					message : "status updated!"
				})
			})
				.then()
				.catch(err=>{
					res.status(500).json({
						message : "Status update is failed"
					})
				})
		}
		catch (e) {
			console.log(e);
			return res.status(500).json({
				data: null,
				message: 'Complain Server Error',
				statusCode: StatusCodes.ServerError
			});
		}
}

//get customer details
exports.getComplainDetails = (req,res,next) => {
	try{
		db.transaction(async t => {
			Customer.findAll({
				where: { id: req.params.customerId }
				},
				{ transaction: t })
				.then((details) => {
					if (details.length > 0) {
						res.status(200).json({
							data: details,
							message: 'Customer details received successfully',
							statusCode: StatusCode.Success
						});
					} else {
						res.status(200).json({
							data: null,
							message: 'No details found',
							statusCode: StatusCode.Success
						});
					}
				});
		})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					data: null,
					message: 'Could not get customer',
					statusCode: StatusCode.DBError
				});
			});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			data: null,
			message: 'view Customer details error',
			statusCode: StatusCode.ServerError
		});
	}
};

//Add complains
exports.addComplain = (req,res,next) => {
	try {
		db.transaction(async t => {
			const complain = await Complain.create({
				customerId: req.body.customerId,
				contactPerson: req.body.contactPerson,
				contactPersonNumber: req.body.contactPersonNumber,
				designation: req.body.designation,
				description: req.body.description,
				complainTypeId: req.body.complainTypeId,
				statusId: statusType.Pending
			},
				{ transaction: t });
			await Audit.create(
				{
					userId: req.header('loginId'),
					description: 'Complain Id ' + complain.getDataValue('id') + ' created'
				},
				{ transaction: t }
			);
			res.status(201).json({
				data: null,
				message: 'Complain created successfully',
				statusCode: StatusCode.Success
			})
		}).then()
			.catch(e => {
				console.log(e);
				res.status(200).json({
					data: null,
					message: 'Complain cannot be created',
					statusCode: StatusCode.DBError
				});
			});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			data: null,
			message: 'Server error',
			statusCode: StatusCode.ServerError
		});
	}
}

exports.getComplaintStatusCount = (req, res, next) => {
	try {
		db.transaction(async t => {
			const complaintStatusCount = await Complain.findAll({
				attributes: ['Complain.statusId', [sequelize.fn('count', 'Complain.statusId'), 'count']],
				group : ['Complain.statusId']
			}, { transaction: t }).then();
			res.status(200).json({
				data: complaintStatusCount,
				message: 'Status count retrieved successfully',
				statusCode: StatusCodes.Success
			});
		}).then()
			.catch(err => {
					console.log(err);
					res.status(500).json({
						data: '',
						messsage: 'Cannot get count',
						statusCode: StatusCodes.DBError
					});
				}
			);
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			data: null,
			message: 'Get status server error',
			statusCode: StatusCodes.ServerError
		});
	}
}
