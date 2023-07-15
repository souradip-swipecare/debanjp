const mongose = require('mongoose');
const Usermodel = mongose.Schema(
    {
        name:{type:String,required:true},
        password:{type:String,required:true},
        mobile:{type:Number,required:true},
        role: { type:mongose.Schema.Types.Number, ref: 'role' },
        session:{trype:String}
    },
    {
        timestamps:true
    }
)
module.exports = mongose.model('user',Usermodel);