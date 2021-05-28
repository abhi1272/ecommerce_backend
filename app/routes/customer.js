const appConfig = require("./../../config/appConfig");
const customer = require('../controllers/customer')

module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/customer`;

    app.post(baseUrl+'/add',customer.create);

    app.get(baseUrl,customer.getAllCustomers);

    app.get(baseUrl+'/:id',customer.getCustomer);

    app.patch(baseUrl+'/:id',customer.updateCustomer);

    app.delete(baseUrl+'/:id',customer.deleteCustomer);
    
};


