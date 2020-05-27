const mongoose = require('mongoose');



const billSchema = mongoose.Schema({
    billId: {
        type: String,
        require: true
    },
    totalAmount: {
        type: Number,
        require:true
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    },
    paymentIds:[]
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Bill', billSchema);