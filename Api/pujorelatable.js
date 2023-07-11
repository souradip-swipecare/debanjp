const pujom = require('../model/pujorelatble');
const otpg = require('../Api/helper');



class Pujocontroller {
    async pujorepost(req,res){
      try{
        const {text} = req.body;
        
          if (!_.isEmpty(text)){
            req.body.image = req.file.filename;
            let otpe = await otpg.otpgenerat();
            let uploadpu = await pujom.create({
                id: otpe,
                txt: req.body.text,
                img: req.body.image
            });
            if (uploadpu && uploadpu._id){
              return res.status(200).json({
                status: 'TXN', message: "Data upload successfully"
              })
            }else{
              return res.status(201).json({
                status: 'ERR', message: "Data upload failed"
              })
            }
            
        }else{
            return res.status(201).json({ status: 'ERR', message: "text field required or something went wrong" });
        }
      }catch(err){
      throw err;
       return res.jsonp({ status: 'ERR', message: "something wet wrong" }, 500);
        
      }
    }
}

module.exports = new Pujocontroller();