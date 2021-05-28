
const express = require('express');
const nodemailer = require('nodemailer');
const EmailModel = require('../models/email');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const moment = require('moment');

let sendMail = (email,name) => {

    // let stri = JSON.parse(Object.keys(req.body)[0]);
    // let mobileNumber = stri.phone;
    let emailId = email;
    // let message = stri.message;
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let account = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'awzing.help@gmail.com',
                pass: process.env.PASS
            }
        });

        // setup email data with unicode symbols
        let mailOptionsOwner = {
            from: 'awzing.help@gmail.com', // sender address
            to: emailId, // list of receivers
            subject: "Contact-Us", // Subject line
            text: `welcome ${name} , your account is successfully registered !`
        };

        // Send mail to the user
        let mailOptionsUser = {
            from: 'awzing.help@gmail.com', // sender address
            to: emailId, // list of receivers
            subject: "Thank You", // Subject line
            html: '<b>Hi <b>'+ name + " " + 'Thanks for contacting us, we will contact you soon' 
        };
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptionsOwner);
 
        await transporter.sendMail(mailOptionsUser);
        await addEmail(name,emailId);

        //console.log("Message sent: %s", info.messageId);
        res.send(Object.keys(req.body)[0]);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);

};


let addEmail = (name,emailId) => {

    let Email = EmailModel({
        name: name,
        email: emailId,
        createdTime: Date()
    });

    Email.save((err, result) => {
        if (err) {
            logger.captureError('some error occured', 'emailController : addemail', 10);
            let apiResponse = response.generate(true, 'some error occured', 400, err);
            console.log(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'email saved', 200, result);
            console.log(apiResponse);
            console.log(result);
        }
    });
};


let getAllEmail = (req, res) => {

    EmailModel.find({}).exec((err, result) => {
        if (err) {
            logger.captureError('some error occured', 'mailController : getEmail', 10);
            let apiResponse = response.generate(true, 'some error occured', 400, err);
            res.send(apiResponse);
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'email not found', 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'email found', 200, result);
            res.send(apiResponse);
        }
    });
};


module.exports = {
    sendMail: sendMail,
    getEmail: getAllEmail
};