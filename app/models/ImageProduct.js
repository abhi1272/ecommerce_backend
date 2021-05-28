const mongoose = require('mongoose');

const imageProductSchema = mongoose.Schema();

let prodObj = {
    productName:{
        type:String,
        require:true,
        trim:true
    },
    company:{
        type:String,
        require:true,
        trim:true
    },
    MRP:{
        type:Number,
        require:true
    },
    Rate:{
        type:Number
    },
    image:{
        type:Buffer
    }
}

imageProductSchema.add(prodObj)

module.exports = mongoose.model('ImageProduct',imageProductSchema);