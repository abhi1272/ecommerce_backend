const appConfig = require("./../../config/appConfig");

module.exports.setRouter = (app) => { 

    let baseUrl = `${appConfig.apiVersion}`;


    app.get('/', (req,res) => {
        res.send('OK')
    });

    app.get(baseUrl+'/', (req,res) => {
        res.send('Api version live')
    });
    
};



