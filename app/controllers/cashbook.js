const CashbookModel = require('../models/Cashbook');
const BillModel = require('../models/Bill');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const request = require('../_helper/request')


let getSingleCashbook = (req, res) => {

    CashbookModel.find({ _id: req.params.id })
        .exec((err, result) => {
            if (err) {
                logger.captureError('some error occured', 'CashbookController : getCashbook', 10);
                let apiResponse = response.generate(true, 'some error occured', 400, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'cashbook not found', 500, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, 'cashbook found', 200, result);
                res.send(apiResponse);
            }
        }
        );
};



let getAllCashbook = async (req, res) => {

    await CashbookModel.find({})
        .exec((err, result) => {
            if (err) {
                logger.captureError('some error occured', 'CashbookController : getCashbook', 10);
                let apiResponse = response.generate(true, 'some error occured', 400, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'cashbook not found', 500, null);
                res.send(apiResponse);
            } else {
                // let count = CashbookModel.countDocuments()
                // console.log(count)
                let apiResponse = response.generate(false, 'cashbook found', 200, result);
                res.send(apiResponse);
            }
        }
        );
};



let addCashbook = async (req, res) => {

    const {customerId,customerName,amount} = req.body

    const result = await BillModel.find({$or:[{Customer:customerName},{customerId}]}).lean()
    console.log(result)

    let foundBillToUpdate = result.find(item => item.paymentIds == undefined)
    
    const requestObj ={
        url : `localhost:4000/api/v1/payment/${foundBillToUpdate._id}`,
        paidAmount: amount
    }

    const response = request.callApi(requestObj)
    console.log(response)

    // let amountLeft
    // if(!foundBillToUpdate.billAmountLeft){
    //     amountLeft = foundBillToUpdate.billAmount - amount
    // }else{
    //     amountLeft = foundBillToUpdate.billAmountLeft - amount
    // }

    // await BillModel.updateOne({Bill_No:foundBillToUpdate.Bill_No},{$set:{billAmountLeft:amountLeft}})

    // console.log(found)
    let Cashbook = CashbookModel({
        ...req.body
    });

    res.send(result)

    // Cashbook.save((err, result) => {
    //     if (err) {
    //         logger.captureError('some error occured', 'CashbookController : addCashbook', 10);
    //         let apiResponse = response.generate(true, 'some error occured', 400, err);
    //         res.send(apiResponse);
    //     } else {
    //         let apiResponse = response.generate(true, 'cashbook saved', 200, result);
    //         res.send(apiResponse);
    //         console.log(result);
    //     }
    // });


};

let editCashbook = (req, res) => {

    let options = req.body;
    CashbookModel.updateOne({ _id: req.params.id},options,(err, result) => {
        if (err) {
            logger.captureError('some error occured', 'CashbookController: editCashbook');
            let apiResponse = response.generate(true, 'some error occured', 400, err);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'cashbook not found', 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, `cashbook updated successfully ${req.params.Batch}`, 200, result);
            res.send(apiResponse);
        }
    });

};

let deleteCashbook = (req,res) =>{

    console.log(req.params.Batch);
    CashbookModel.deleteMany({Batch:req.params.Batch},(err,result)=>{
        if(err){
            logger.captureError('error occured','CashbookController : deleteCashbook',10);
            res.send(err);
        }else if(check.isEmpty(result)){
            let apiResponse = response.generate(true,'cashbook not found',500,null);
            res.send(apiResponse);
        }else{
            let apiResponse = response.generate(false,`cashbook ${req.params.Batch} deleted found`,500,null);
            res.send(apiResponse);
        }
    });
    
};



module.exports = {
    getSingleCashbook,
    getAllCashbook,
    addCashbook,
    editCashbook,
    deleteCashbook
};
