
const mongose = require('mongoose');

const default_value = "null";

const Pujor = mongose.Schema({
    id: { type: Number, required:true },
    txt: { type: String, default: default_value },
    img: { type: String, required: true },

},
    {
        timestamps: true
    })

module.exports = mongose.model('pujor', Pujor);