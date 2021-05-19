const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");

const categorySchema = new mongoose.Schema({

    categoryId:{
        type:String,
        default:uuidv4()
    },
    name:{
        type:String,
        default:''
    },
    sub_category:[
        {type:String}
    ],
},{
    timestamps:true
});


module.exports = mongoose.model('Category',categorySchema);
