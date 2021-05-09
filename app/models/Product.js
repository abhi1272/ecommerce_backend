const mongoose = require('mongoose');

const productSchema = mongoose.Schema();

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
    batchNo:{
        type:String,
        trim:true,
        unique:true
    },
    MRP:{
        type:Number,
        require:true
    },
    Rate:{
        type:Number
    },
    image:{
        type:String
    }
}

productSchema.add(prodObj)

module.exports = mongoose.model('Product',productSchema);