const Payment = require('../models/payment');
const Bill = require('../models/Bill');
const check = require('../libs/checkLib');
const shortId = require('shortid');
const ObjectId = require('mongoose').ObjectId;
const { update } = require('../models/Bill');

let create = async (req,res) => {
    const {customerId,customerName} = req.body

    let billID
    let restAmount
   
    if(req.body.billID){
        billID = req.body.billID
    }else{
        const result = await Bill.find({$or:[{Customer:customerName}]}).sort({Date:1,Time:1}).lean() 
        let foundBillToUpdate = result.find(item => item.paymentIds == undefined || item.fullPaidStatus === false)
        billID = foundBillToUpdate._id
    }

    let result = await Bill.findById(billID);

    let billAmount = result.billAmount;

    let paymentId = shortId.generate();

    let data =  await Payment.find({billID}).sort({ _id: -1 }).limit(1);
    console.log(data)

    if(data.length > 0){
        restAmount = data[0].restAmount  - +req.body.paidAmount;
        if(data[0].restAmount === 0){
            var message = 'No more payments to this Bill as the restAmount is already zero';
            res.send(message);
            return;
        }
    }
    else{
        console.log('billAmount',billAmount,req.body.paidAmount)
        restAmount = billAmount - +req.body.paidAmount;
    }

    if(restAmount < 0){
        console.log('if...')
        Math.abs(restAmount);
        var message = `adjust ${restAmount} in next bill`;
            restAmount = 0;
        let newPayment = new Payment({
            ...req.body,
            customer_name:result.Customer,
            billNo:result.Bill_No
            ,billID
            ,billAmount
            ,restAmount
            ,paymentId
        });

        console.log('newPayment',newPayment)

        try{
            await newPayment.save();

            const query = {'_id': billID},
            update = {
                $set: {fullPaidStatus:restAmount?false:true,billAmountLeft:restAmount},
                $push: {paymentIds: newPayment.paymentId}
            },
            options = {upsert: true};
           
            await Bill.findOneAndUpdate(query,update,options);
        
            res.send({newPayment,message});
        }catch(e){
            res.status('500').send(e);
        }
    }else{

        let newPayment = new Payment({
            ...req.body,
            customer_name:result.Customer,
            billNo:result.Bill_No
            ,billID
            ,billAmount
            ,restAmount
            ,paymentId
        });

        console.log('else', newPayment)


        try{
            await newPayment.save();

            console.log('rest status',restAmount)

            const query = {'_id': billID},
            update = {
                $set: {fullPaidStatus:restAmount?false:true,billAmountLeft:restAmount},
                $push: {paymentIds: newPayment.paymentId}
            },
            options = {upsert: true};
           
            await Bill.findOneAndUpdate(query,update,options);
          
            res.send({newPayment,message});
        }catch(e){
            res.status('500').send(e);
        }
    }

};


let getAllPayment = async (req,res) => {

    let filter = {}

    if(req.query.id){
        filter = {billID:req.query.id}
    }else if(req.query.name){
        filter = {customer_name:req.query.name}
    }

    try{
        let payment = await Payment.find(filter).sort({createdAt:-1})
        res.send(payment);
    }catch(e){
        res.send(e);
    }
   
};


let updatePayment =  async (req,res) => {

    let id = req.params.id;

    try{

        let oldData = await Payment.findById(id);

        let diffPaidAmount = req.body.paidAmount > oldData.paidAmount ? req.body.paidAmount - oldData.paidAmount : oldData.paidAmount -req.body.paidAmount;

        let restAmount = oldData.restAmount - diffPaidAmount;

        if(restAmount < 0 ){
            var upDateMessage = `adjust ${restAmount} in next bill`;
            restAmount = 0;
        }

        let updatedPaymentData =  await Payment.findByIdAndUpdate(id,{paidAmount:req.body.paidAmount,restAmount:restAmount},{new:true});
        console.log(updatePayment);
        res.send({updatedPaymentData,upDateMessage});

    }catch(e){
        res.send(e);
    }
};

let deletePayment = async (req,res) => {
    
    let id = req.params.id;

    try{
        let result =  await Payment.findByIdAndDelete(id);
        res.send(result);
    }catch(e){
        res.send(e);
    }
};

module.exports = {
    create,
    getAllPayment,
    updatePayment,
    deletePayment
};