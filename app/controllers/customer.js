const { compare } = require('bcryptjs');
const Customer = require('../models/Customer');

let create = async (req,res) => {

    let newCustomer = Customer(req.body);

    try{
        await newCustomer.save();
        res.send(newCustomer);
    }catch(e){
        res.status('500').send(e);
    }
};

let getAllCustomers = async (req,res) => {

    skipValue = +req.query.skip || 0;
    limit = +req.query.limit || 0; 

    try{
        let result = await Customer.find({}).populate('billIds','billAmount billAmountLeft').sort({Customer_Name:1}).lean()
        result.forEach((item) => {
            item.totalBillAmount = 0
            item.totalBillAmountLeft = 0
            if(item.billIds && item.billIds.length > 0){
                item.billIds.forEach(ite => {
                    item.totalBillAmount = item.totalBillAmount + Number(ite.billAmount)
                    item.totalBillAmountLeft = item.totalBillAmountLeft + Number(ite.billAmountLeft)
                })
            }
        })
        res.send(result);
    }catch(e){
        res.send(e);
    }
};


let getCustomer = async (req,res) => {

    let id = req.params.id;
    
    try{
        let result = await Customer.findById(id);
        res.send(result);
    }catch(e){
        res.send(e);
    }
};


let updateCustomer =  async (req,res) => {

    let id = req.params.id;

    try{
        let updatedCustomerData =  await Customer.findByIdAndUpdate(id,req.body,{new:true});
        res.send(updatedCustomerData);
    }catch(e){
        res.send(e);
    }
};

let deleteCustomer = async (req,res) => {
    
    let id = req.params.id;

    try{
        let result =  await Customer.findByIdAndDelete(id);
        res.send(result);
    }catch(e){
        res.send(e);
    }
};

module.exports = {
    create,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
};

