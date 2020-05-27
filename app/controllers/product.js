// const ProductModel = require('../models/Product');
// const logger = require('../libs/loggerLib');
// const check = require('../libs/checkLib');
// const response = require('../libs/responseLib');


// let getSingleProduct = (req, res) => {

//     ProductModel.find({ _id: req.params.id })
//         .exec((err, result) => {
//             if (err) {
//                 logger.captureError('some error occured', 'productController : getProduct', 10);
//                 let apiResponse = response.generate(true, 'some error occured', 400, err);
//                 res.send(apiResponse);
//             } else if (check.isEmpty(result)) {
//                 let apiResponse = response.generate(true, 'product not found', 500, null);
//                 res.send(apiResponse);
//             } else {
//                 let apiResponse = response.generate(false, 'product found', 200, result);
//                 res.send(apiResponse);
//             }
//         }
//         );
// };



// let getAllProduct = (req, res) => {

//     ProductModel.find({})
//         .exec((err, result) => {
//             if (err) {
//                 logger.captureError('some error occured', 'productController : getProduct', 10);
//                 let apiResponse = response.generate(true, 'some error occured', 400, err);
//                 res.send(apiResponse);
//             } else if (check.isEmpty(result)) {
//                 let apiResponse = response.generate(true, 'product not found', 500, null);
//                 res.send(apiResponse);
//             } else {
//                 let apiResponse = response.generate(false, 'product found', 200, result);
//                 res.send(apiResponse);
//             }
//         }
//         );
// };



// let addProduct = (req, res) => {

//     let Product = ProductModel({
//         ...req.body
//     });

//     Product.save((err, result) => {
//         if (err) {
//             logger.captureError('some error occured', 'productController : addProduct', 10);
//             let apiResponse = response.generate(true, 'some error occured', 400, err);
//             res.send(apiResponse);
//         } else {
//             let apiResponse = response.generate(true, 'product saved', 200, result);
//             res.send(apiResponse);
//             console.log(result);
//         }
//     });


// };

// let editProduct = (req, res) => {

//     let options = req.body;
//     ProductModel.updateOne({ _id: req.params.id},options,(err, result) => {
//         if (err) {
//             logger.captureError('some error occured', 'productController: editProduct');
//             let apiResponse = response.generate(true, 'some error occured', 400, err);
//             res.send(apiResponse);
//         }
//         else if (check.isEmpty(result)) {
//             let apiResponse = response.generate(true, 'product not found', 500, null);
//             res.send(apiResponse);
//         } else {
//             let apiResponse = response.generate(false, `product updated successfully ${req.params.Batch}`, 200, result);
//             res.send(apiResponse);
//         }
//     });

// };

// let deleteProduct = (req,res) =>{

//     console.log(req.params.Batch);
//     ProductModel.deleteMany({Batch:req.params.Batch},(err,result)=>{
//         if(err){
//             logger.captureError('error occured','productController : deleteProduct',10);
//             res.send(err);
//         }else if(check.isEmpty(result)){
//             let apiResponse = response.generate(true,'product not found',500,null);
//             res.send(apiResponse);
//         }else{
//             let apiResponse = response.generate(false,`product ${req.params.Batch} deleted found`,500,null);
//             res.send(apiResponse);
//         }
//     });
    
// };



// module.exports = {
//     getSingleProduct: getSingleProduct,
//     getAllProduct: getAllProduct,
//     addProduct: addProduct,
//     editProduct:editProduct,
//     deleteProduct:deleteProduct
// };
