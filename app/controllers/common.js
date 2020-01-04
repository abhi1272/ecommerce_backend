const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const Model = require('../../config/models')
const appConfig = require('../../config/appConfig')


let getSingleProduct = (req, res) => {

    console.log(appConfig.model)

    Model[appConfig.model].find({ _id: req.params.id })
        .exec((err, result) => {
            if (err) {
                logger.captureError('some error occured', 'productController : getProduct', 10);
                let apiResponse = response.generate(true, 'some error occured', 400, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, `${appConfig.model} not found`, 500, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, `${appConfig.model} found`, 200, result);
                res.send(apiResponse);
            }
        }
        );
};



let getAllProduct = (req, res) => {

    Model[appConfig.model].find({})
        .exec((err, result) => {
            if (err) {
                logger.captureError('some error occured', 'productController : getProduct', 10);
                let apiResponse = response.generate(true, 'some error occured', 400, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, `${appConfig.model} not found`, 500, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, `${appConfig.model} found`, 200, result);
                res.send(apiResponse);
            }
        }
        );
};



let addProduct = (req, res) => {

    let Product = Model[appConfig.model]({
        ...req.body
    });

    Product.save((err, result) => {
        if (err) {
            logger.captureError('some error occured', 'productController : addProduct', 10);
            let apiResponse = response.generate(true, 'some error occured', 400, err);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(true, `${appConfig.model} saved`, 200, result);
            res.send(apiResponse);
            console.log(result);
        }
    });


};

let editProduct = (req, res) => {

    let options = req.body;
    Model[appConfig.model].updateOne({ _id: req.params.id},options,(err, result) => {
        if (err) {
            logger.captureError('some error occured', 'productController: editProduct');
            let apiResponse = response.generate(true, 'some error occured', 400, err);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, `${appConfig.model} not found`, 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, `${appConfig.model} updated successfully ${req.params.Batch}`, 200, result);
            res.send(apiResponse);
        }
    });

};

let deleteProduct = (req,res) =>{

    Model[appConfig.model].deleteMany({Batch:req.params.Batch},(err,result)=>{
        if(err){
            logger.captureError('error occured','productController : deleteProduct',10);
            res.send(err);
        }else if(check.isEmpty(result)){
            let apiResponse = response.generate(true,`${appConfig.model} not found`,500,null);
            res.send(apiResponse);
        }else{
            let apiResponse = response.generate(false,`${appConfig.model} ${req.params.Batch} deleted found`,500,null);
            res.send(apiResponse);
        }
    });
    
};



module.exports = {
    getSingleProduct: getSingleProduct,
    getAllProduct: getAllProduct,
    addProduct: addProduct,
    editProduct:editProduct,
    deleteProduct:deleteProduct
};
