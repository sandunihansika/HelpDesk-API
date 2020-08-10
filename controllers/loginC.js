const userType = require('./loginUserType');
const user ={
	email : "o.t.wathsala@gmail.com",
	password :"123456"
}

exports.getLoginDetails = (req,res)=>{
	res.send('hello world check login');
}

exports.checkLoginDetails = (req,res,next)=> {
	console.log(req.body.email, req.body.password, req.headers.usertype,req.headers);
	res.locals.newuserType =  userType.AdminUser;
	console.log(res.locals.newuserType);
	next();
}
