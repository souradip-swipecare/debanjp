const jwt = require('jsonwebtoken');
const user = require('../model/user')
const secrectkey = process.env.JWT
class Middleware {
async adminmiddleware(req,res,next){
    try{
        if (req.headers && req.headers.authorization){
            let decode = req.headers.authorization.split(" ");
            jwt.verify(decode[1],secrectkey,(err,data)=>{
                if(!err){
                    req.userd = data;
                    next();
                }else{
                    return res.status(402).json({ status: 'ERR', message: 'not verify user' })

                }
            })
 }else{
    return res.status(404).json({status:'ERR',message:'not fond authorisation key'})
 }
    }catch(err){
        throw err;
    }
}
async sessioncheck(req,res,next){
    try{
      let userde = req.userd;
      let verify = await user.findById(userde.id);
        if (verify.session == userde.token){
           req.userdata = verify;
           next();
        }else{
          return res.status(402).json({status:'ERR',message:'invalid session'});
        }
    }catch(err){
        throw err;
    }
}

}
module.exports = new Middleware();