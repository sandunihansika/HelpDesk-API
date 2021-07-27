const Joi = require('@hapi/joi');
const StatusCodes = require('../../common/statusCode');
const log = require('log4js').getLogger('AdminUser');
const axios = require('axios');
const jwtDecode = require('jwt-decode');

exports.validateUserCredentials = (req, res, next) => {

  try {
    //define a schema using joi (schema description language)
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    });
    const { error } = schema.validate(req.body);  // validate email and password
    if (error && error.details) {
      return res.status(200).json({
        statusCode: StatusCodes.ValidationError,
        message: error.details[0].message,
        data: null
      });
    } else {
      next();
    }
  } catch (err) {
    log.error(err);
    return res.status(200).json({
      data: null,
      message: 'User login validation error',
      StatusCode: StatusCodes.ValidationError
    });
  }
};

exports.userLogin = (req, res, next) => {

  try {
   axios.post('http://54.169.55.109:5001/globalUser/login', {

      email: req.body.email,
      password: req.body.password,
      clientId: +req.header('clientId')
    }, { headers: { userType: req.header('userType') } })
      .then(function(responseLogin) {
        //console.log(responseLogin);
        if (responseLogin.data.statusCode === StatusCodes.Success) {
          const responseData = {
            token: responseLogin.data.data
          };
          res.status(200).json({
            data: responseData,
            message: 'User - [' + req.body.email + '] login successfully',
            statusCode: StatusCodes.Success
          });
        }else{
          return res.status(200).json({
            data: null,
            message: 'Invalid email or password',
            statusCode: StatusCodes.ServerError
          });
        }
      })
      .catch((error) => {
        console.log(error);
        log.error(error);
        return res.status(200).json({
          data: null,
          message: 'Invalid email or password',
          statusCode: StatusCodes.ServerError
        });
      });

  } catch (error) {
    log.error(error);
    return res.status(200).json({
      data: null,
      message: 'User Login Server Error',
      statusCode: StatusCodes.ServerError
    });
  }
};


