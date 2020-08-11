const jwt = require('jsonwebtoken');
const log = require('log4js').getLogger('Authorization');
const StatusCodes = require('../../common/statusCode');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.userData = jwt.verify(token, process.env.JWT_KEY);
    req.headers.clientId = +req.userData.clientId;
    req.headers.userType = +req.userData.userType;
    req.headers.globalUserId = +req.userData.globalUserId;
    next();
  } catch (error) {
    log.error(error);
    return res.status(200).json({
      message: 'Token Authentication failed',
      statusCode: StatusCodes.InvalidToken
    });
  }
};
