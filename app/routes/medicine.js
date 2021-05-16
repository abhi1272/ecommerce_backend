const common = require("./../../app/controllers/common");
const appConfig = require("./../../config/appConfig");


module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/medicine`;

    app.post(`${baseUrl}/add`,common.createModel);

    // app.get(`${baseUrl}`,common.readAllModel);

    app.get(`${baseUrl}`,common.readModel);

    app.patch(`${baseUrl}/:id`,common.updateModel);

    app.delete(`${baseUrl}/:id`,common.deleteModel);
    
};
