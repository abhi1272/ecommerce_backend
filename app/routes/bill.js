const bill = require("./../../app/controllers/bill");
const appConfig = require("./../../config/appConfig");

module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/bill`;

    app.post(`${baseUrl}/create`,bill.create);

    app.get(`${baseUrl}`,bill.getAllBills);

    app.get(`${baseUrl}/:customer`,bill.getBillsByCustomer);

    app.get(`${baseUrl}/:id`,bill.getBill);

    app.patch(`${baseUrl}/:id`,bill.updateBill);

    app.delete(`${baseUrl}/:id`,bill.deleteBill);
    
};
