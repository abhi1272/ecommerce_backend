const appConfig = require("./../../config/appConfig");
const common = require('../controllers/common')
const auth = require('../middlewares/auth')
const multer = require('multer');
const product = require("../controllers/product");
const storage = multer.memoryStorage()
const multerUploads = multer({ storage }).single('image');

module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/product`;
    
    app.post(baseUrl+'/add',multerUploads , product.addProduct);

    app.get(baseUrl+'/invoice', product.createInvoice)

    app.get(baseUrl,product.getAllProduct);

    app.get(baseUrl+'/:id',common.readModel);

    app.patch(baseUrl+'/:id',common.updateModel);

    app.delete(baseUrl+'/:id',common.deleteModel);
    
};



