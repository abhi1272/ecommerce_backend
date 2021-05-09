const appConfig = require("./../../config/appConfig");
const cashbook = require('../controllers/cashbook')
const auth = require('../middlewares/auth')

module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}/cashbook`;

    app.post(baseUrl+'/add',cashbook.addCashbook);

    app.get(baseUrl,cashbook.getAllCashbook);

    app.get(baseUrl+'/:id',cashbook.getSingleCashbook);

    app.patch(baseUrl+'/:id',cashbook.editCashbook);

    app.delete(baseUrl+'/:id',cashbook.deleteCashbook);
    
};



