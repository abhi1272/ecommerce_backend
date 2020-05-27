const appConfig = require("./../../config/appConfig");
const common = require('../controllers/common')
const auth = require('../middlewares/auth')

module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/product`;

    app.post(baseUrl+'/add',common.createModel);

    app.get(baseUrl,common.readAllModel);

    app.get(baseUrl+'/:id',common.readModel);

    app.patch(baseUrl+'/:id',common.updateModel);

    app.delete(baseUrl+'/:id',common.deleteModel);
    
};



