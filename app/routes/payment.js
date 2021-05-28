const payment = require("./../../app/controllers/payment");
const appConfig = require("./../../config/appConfig");
const auth = require("../middlewares/auth");


module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/payment`;

    app.post(`${baseUrl}/add`,payment.create);

    app.get(`${baseUrl}`,payment.getAllPayment);

    app.patch(`${baseUrl}/:id`,payment.updatePayment);

    app.delete(`${baseUrl}/:id`,payment.deletePayment);
    
};
