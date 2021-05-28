const Queue = require('bull');
const nodemailer = require('nodemailer');
const client = require('./redis')
// 1. Initiating the Queue


const myFirstQueue = new Queue('my-first-queue');

const job = await myFirstQueue.add({
  foo: 'bar'
});


// const sendMailQueue = new Queue('sendMail', {
//   client: {
//     host: '127.0.0.1',
//     port: 6379,
//     password: 'root'
//   }
// });
// const data = {
//   email: 'abhi.omex@outlook.com'
// };

// const options = {
//   delay: 10, // 1 min in ms
//   attempts: 2
// };
// // 2. Adding a Job to the Queue
// sendMailQueue.add(data, options);

// // 3. Consumer
// sendMailQueue.process(async job => { 
//     return await sendMail(job.data.email); 
//   });
//   function sendMail(email) {
//     return new Promise((resolve, reject) => {
//       let mailOptions = {
//         from: 'abhishek.omex@gmail.com',
//         to: email,
//         subject: 'Bull - npm',
//         text: "This email is from bull job scheduler tutorial.",
//       };
//       let mailConfig = {
//         service: 'gmail',
//         auth: {
//           user: 'abhishek.omex@gmail.com',
//           pass: 'abhi@gmail5'
//         }
//       };
//       nodemailer.createTransport(mailConfig).sendMail(mailOptions, (err, info) => {
//         if (err) {
//             console.Console(err)
//           reject(err);
//         } else {
//             console.Console(info)
//           resolve(info);
//         }
//       });
//     });
//   }