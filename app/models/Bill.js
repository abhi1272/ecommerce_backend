const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    ORDER_NO:{
        type:Number
    },
    Bill_No: {
        type: String,
        require: true
    },
    billAmount: {
        type: Number,
        require:true
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    },
    Customer:{
        type: String
    },
    billAmountLeft:{
        type:Number
    },
    fullPaidStatus:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    paymentIds:[]
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Bill', billSchema);