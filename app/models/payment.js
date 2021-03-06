const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    
    customer_name:{
        type:String,
        required:true,
        trim:true
    },
    paidAmount:{
        type:Number,
        required:true,
        trim:true
    },
    paymentId:{
        type:String,
        required:true
    },
    billID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Bill'
    },
    billNo:{
        type:String
    },
    restAmount:{
        type:Number,
        required:true,
        default:0
    },
    billAmount:{
        type:Number,
        required:true
    }
    
},{
    timestamps:true
});

module.exports = mongoose.model('Payment',paymentSchema);