const appConfig = require("./../../config/appConfig");
const common = require('../controllers/common')
const productController = require('../controllers/product')
const helper = require('../_helper/file-upload')
const auth = require('../middlewares/auth')
const multer = require('multer');
const product = require("../controllers/product");
const upload = multer({
    // limits:{
    //     fileSize:1000000
    // },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(JPG|png|jpg|jpeg|PNG)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})
module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/product`;

    app.post(baseUrl+'/prescription',product.addPrescription)


    app.post(baseUrl+'/add',common.createModel);

    app.post(baseUrl+'/upload',upload.single('upload'),helper.uploadProduct, (error,req,res,next) => {
        res.status(400).send({error:error.message})
    })

    app.get(baseUrl,productController.getAllProduct);

    app.get(baseUrl+'/:id',common.readModel);

    app.patch(baseUrl+'/:id',common.updateModel);

    app.delete(baseUrl+'/:id',common.deleteModel);
    
};



