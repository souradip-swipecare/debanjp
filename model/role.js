const mongose = require('mongoose');

const Role = mongose.Schema({
    name:{type:String,required:true},
    id:{type:Number,rrequired:true}
},
{
    timestamps:true
});
module.exports= mongose.model('role',Role);
