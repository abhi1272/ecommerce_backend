const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({

    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    },
    customerName:{
        type:String,
        default:'CASH'
    },
    billIds:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bill'
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    
},{
    timestamps:true
});

module.exports = mongoose.model('Cashbook',paymentSchema);