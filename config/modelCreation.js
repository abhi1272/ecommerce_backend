const fs = require('fs')
const util = require('util')
const appConfig = require('./appConfig')

module.exports.setRouter = (app) => {

    app.post(`${appConfig.apiVersion}/createTable`, (req, res) => {

        let model = req.body.modelName
        let modelObj = req.body.modelObj
        let upperCaseModel = model.slice(0, 1).toUpperCase() + model.slice(1);

        fs.writeFileSync(`./app/models/${upperCaseModel}.js`, "const mongoose = require('mongoose');");
        fs.appendFileSync(`./app/models/${upperCaseModel}.js`, `const ${model}Schema = new mongoose.Schema(${util.inspect(modelObj)});`, 'utf-8');
        fs.appendFileSync(`./app/models/${upperCaseModel}.js`, `module.exports = mongoose.model('${upperCaseModel}',${model}Schema);`);


        fs.readFile(`./app/models/${upperCaseModel}.js`, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            var result = data.replace(/'String'/gi, 'String');
            var result = result.replace(/'Number'/gi, 'Number');
            var result = result.replace(/'Buffer'/gi, 'Buffer');

            fs.writeFile(`./app/models/${upperCaseModel}.js`, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });


        fs.readFile(`./app/routes/product.js`, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            var result = data.replace(/product/gi, model);

            fs.writeFile(`./app/routes/${model}.js`, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });


            modeelConfigData = `const model = {
            Customer:require('../app/models/Customer'),
            Product:require('../app/models/Product'),
            ${upperCaseModel}:require('../app/models/${upperCaseModel}')
         }
         
         module.exports = model
         `
            fs.writeFile(`./config/models.js`, modeelConfigData, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });


        res.send('Table Created..')
    })

}