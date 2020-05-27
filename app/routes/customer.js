const appConfig = require("./../../config/appConfig");
const common = require('../controllers/common')

module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/customer`;

    app.post(baseUrl+'/add',common.createModel);

    app.get(baseUrl,common.readAllModel);

    app.get(baseUrl+'/:id',common.readModel);

    app.patch(baseUrl+'/:id',common.updateModel);

    app.delete(baseUrl+'/:id',common.deleteModel);
    
};


