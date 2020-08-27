const jwt = require('jsonwebtoken');
const log = require('log4js').getLogger('Authorization');
const StatusCodes = require('../../common/statusCode');

module.exports = (req, res, next) => {
  try {
    console.log('working.......!!');
    // const token = req.headers.authorization.split(' ')[1];
    // req.userData = jwt.verify(token, process.env.JWT_KEY);

    const token = req.header('Authorization').replace('bearer ', '');
    const userData = jwt.verify(token, process.env.JWT_KEY);
    req.headers.clientId = userData.clientId;
    req.headers.userType = userData.userType;
    req.headers.globalUserId = userData.globalUserId;
    next();
  } catch (error) {
    log.error(error);
    return res.status(200).json({
      message: 'Token Authentication failed',
      statusCode: StatusCodes.InvalidToken
    });
    l;
  }
};
