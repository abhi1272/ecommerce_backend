// // const Customer = require('../models/Customer');
// const Model = require('../../config/models')
// const appConfig = require('../../config/appConfig')

// let create = async (req,res) => {

//     let newCustomer = Customer(req.body);

//     try{
//         await newCustomer.save();
//         res.send(newCustomer);
//     }catch(e){
//         res.status('500').send(e);
//     }
// };

// let getAllCustomers = async (req,res) => {

//     skipValue = +req.query.skip || 0;
//     limit = +req.query.limit || 0; 

//     try{
//         let result = await Model[appConfig.model].find({}).limit(limit).skip(skipValue);
//         res.send(result);
//     }catch(e){
//         res.send(e);
//     }
// };


// let getCustomer = async (req,res) => {

//     let id = req.params.id;
    
//     try{
//         let result = await Customer.findById(id);
//         res.send(result);
//     }catch(e){
//         res.send(e);
//     }
// };


// let updateCustomer =  async (req,res) => {

//     let id = req.params.id;

//     try{
//         let updatedCustomerData =  await Customer.findByIdAndUpdate(id,req.body,{new:true});
//         res.send(updatedCustomerData);
//     }catch(e){
//         res.send(e);
//     }
// };

// let deleteCustomer = async (req,res) => {
    
//     let id = req.params.id;

//     try{
//         let result =  await Customer.findByIdAndDelete(id);
//         res.send(result);
//     }catch(e){
//         res.send(e);
//     }
// };

// module.exports = {
//     create,
//     getAllCustomers,
//     getCustomer,
//     updateCustomer,
//     deleteCustomer
// };

