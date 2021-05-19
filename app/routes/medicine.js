const common = require("./../../app/controllers/common");
const appConfig = require("./../../config/appConfig");
const multer = require('multer');
const product = require("../controllers/product");
const storage = multer.memoryStorage()
const multerUploads = multer({ storage }).single('prescription');



module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/medicine`;

    app.post(`${baseUrl}/add`,common.createModel);

    app.post(baseUrl+'/prescription', multerUploads , product.addPrescription)

    app.get(`${baseUrl}`,common.readModelByFilter);

    app.patch(`${baseUrl}/:id`,common.updateModel);

    app.delete(`${baseUrl}/:id`,common.deleteModel);
    
};
