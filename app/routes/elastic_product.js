const appConfig = require("./../../config/appConfig");
const elasticProduct = require('../controllers/elastic.product')

module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/elastic_product`;

    app.post(baseUrl+'/createIndex',elasticProduct.createIndex);

    app.post(baseUrl+'/deleteIndex',elasticProduct.deleteIndex);

    app.post(baseUrl+'/create',elasticProduct.addDocument);

    app.get(baseUrl+'/info',elasticProduct.infoDocument);

    app.get(baseUrl+'/search',elasticProduct.searchDocument);

    app.delete(baseUrl+'/delete',elasticProduct.delDocument);
    
};



