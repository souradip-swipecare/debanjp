const user =require('../model/user');
const jwt =  require('jsonwebtoken');
const helper =require('../Api/helper');
const bccrypt =require('bcryptjs');
const secrectkey = process.env.JWT;

class Adminlogin{
async adminlogin(req,res){
    try{
        const { mobilen, passd } = req.body;
        if(!_.isEmpty(mobilen && passd)){
           let userdetails = await user.findOne({
            mobile: mobilen
           });
           if(userdetails && userdetails.role == 1){
               let passwrd =userdetails.password;
               if (bccrypt.compareSync(passd,passwrd)){
                let otpi = await helper.sesotp();
                let update = {
                    session : otpi
                }
                  // console.log(otpi);
                   let oupdate = await user.findByIdAndUpdate(userdetails._id, update);
                   if (oupdate){
                    const tokenn = jwt.sign({
                        id: userdetails._id,
                        token: otpi
                    },secrectkey,{expiresIn: '24h'});
                    if (tokenn){
                        return res.status(200).json({
                            status: 'TXN', message: 'Token generate successfully',token:tokenn
                        })
                    }else{
                        return res.status(402).json({status: 'ERR', message: 'Something went wrong'})
                    }

                   }else{
                       return res.status(402).json({ status: 'ERR', message: 'Something went wrong' })

                   }

               }else{
                   return res.status(402).json({ status: 'ERR', message: 'User details not matched' })

               }
           }else{
               return res.status(402).json({ status: 'ERR', message: 'User not registered' })
           }

        }else{
            return res.status(402).json({status: 'ERR', message:'parameter is empty'})
        }
    }
    catch(err){
        throw err
    }
}

// async admireg(req,res){
//     try{
//      req.body.password = bccrypt.hashSync(req.body.password,bccrypt.genSaltSync(10));
//      let userreg = user.create(req.body);
//      if(userreg && userreg._id){
//         return res.json({status: 'success'})
//      }
//     }catch(err){
// throw err;
//     }
// }
}
module.exports = new Adminlogin();