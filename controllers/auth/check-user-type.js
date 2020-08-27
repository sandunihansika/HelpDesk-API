const StatusCodes = require('../../common/statusCode');
const log = require('log4js').getLogger('Authorization');


module.exports = (req, res, next) => {
  let authorizedUser = false;

  try {
    console.log('check loading');
    if (res.locals.newuserType === +req.header('userType')) {
      console.log(+req.header('userType'));
      authorizedUser = true;
      next();
    }
    if (!authorizedUser) {
      console.log('not authorized');
      return res.status(200).json({
        statusCode: StatusCodes.Unauthorized,
        message: 'Authorization Error',
        data: null
      });
    }
  } catch (e) {
    // let log;
    log.error(e);
    return res.status(200).json({
      message: 'Authorization Error',
      statusCode: StatusCodes.Unauthorized
    });
  }
};
