const  otp = require('otp-generator');

class Otpgenerate{
async otpgenerat(){
    try{
        const otpp = otp.generate(2, { digits: true, specialChars: false, specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: false });
        
        if(otpp){
            

            return  otpp;
        }else{
            return false;
        }

    }catch(err){
       throw err;
    }
}
// for session otp
async sesotp(req,res){
    try{
        const otpp = otp.generate(20, { digits: true, specialChars: true, specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: true });
        if (otpp){
            return otpp;
        }else{
            return false
        }
    }catch(err){
        throw err;
    }
}
}

module.exports= new Otpgenerate();