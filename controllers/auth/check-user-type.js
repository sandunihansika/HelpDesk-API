const StatusCodes = require('../../common/statusCode');
const log = require('log4js').getLogger('Authorization');


module.exports = (req, res, next) =>{
	let authorizedUser = false;

	try{
		console.log("check loading");

		if(res.locals.newuserType === +req.header('userType')){
			console.log(+req.header('userType'))
			authorizedUser = true;
			next()
		}
		if(!authorizedUser){
			console.log("not authorized");
			return res.status(200).json({
				statusCode: StatusCodes.ValidationError,
				message: error.details[0].message,
				data: null
			});
		}
	}catch(e){
		// let log;
		log.error(e);
		return res.status(200).json({
			data: null,
			message: 'Admin User Login Validation Error',
			statusCode: StatusCodes.ValidationError
		});
	}
};
