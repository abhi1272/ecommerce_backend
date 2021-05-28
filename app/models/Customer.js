const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CustomerSchema = mongoose.Schema({
    Cust_Id:{
      type: String
    },
    Customer_Name: {
      type:String,
    },
    Place:{
      type:String
    },
    address:{
      street:{
        type:String
      },
      place:{
        type:String,
        required:true
      },
      pincode:{
        type:String,
        required:true
      }
    },
    billIds: [
      {
        type:Schema.Types.ObjectId,
        ref:'Bill'
      }
    ]
    ,
    phoneNumber:{
      type :Number
    },
    paymentIds:[]
},
{
    timestamps:true
});


module.exports = mongoose.model('Customer',CustomerSchema); 