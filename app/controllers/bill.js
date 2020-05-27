const Bill = require('../models/Bill');
const Customer = require('../models/Customer');
const shortid = require('shortid');

let create = async (req,res) => {

    let newBill = new Bill({
        ...req.body,
        billId:shortid.generate()
    });

    try{
        await newBill.save();
        
        await Customer.findOneAndUpdate({_id: req.body.customerId}, {$push: {paymentIds: newBill.billId}});
        
        res.send(newBill);

    }catch(e){
        res.status('500').send(e);
    }
};

let getAllBills = async (req,res) => {

    try{
        let bills = await Bill.find({});
        res.send(bills);
    }catch(e){
        res.status('500').send(e);
    }

};


let getBillsByCustomer = async (req,res) => {

    let customerId = req.params.customerId;

    try{
        let bills = await Bill.find({customerId:customerId});
        res.send(bills);
    }catch(e){
        res.status('500').send(e);
    }

};


let getBill = async (req,res) => {

    let id = req.params.id;

    try{
        let result = await Bill.findById(id);
        res.send(result);
    }catch(e){
        res.send(e);
    }
};


let updateBill =  async (req,res) => {

    let id = req.params.id;

    try{
        let updatedBillData =  await Bill.findByIdAndUpdate(id,req.body,{new:true});
        res.send(updatedBillData);
    }catch(e){
        res.send(e);
    }
};

let deleteBill = async (req,res) => {
    
    let id = req.params.id;

    try{

        let result =  await Bill.findByIdAndDelete(id);
        
        res.send(result);
    }catch(e){
        res.send(e);
    }
};

module.exports = {
    create,
    getBillsByCustomer,
    getBill,
    updateBill,
    deleteBill,
    getAllBills
};