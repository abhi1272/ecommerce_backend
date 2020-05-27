const payment = require("./../../app/controllers/payment");
const appConfig = require("./../../config/appConfig");
const auth = require("../middlewares/auth");


module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/payment`;

    app.post(`${baseUrl}/:id`,payment.create);

    app.get(`${baseUrl}/:id`,payment.getSingleBillPayment);

    app.patch(`${baseUrl}/:id`,payment.updatePayment);

    app.delete(`${baseUrl}/:id`,payment.deletePayment);
    
};
