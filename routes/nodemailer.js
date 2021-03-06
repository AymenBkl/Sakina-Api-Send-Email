var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const config = require('./config');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: config.config.email.email,
    pass: config.config.email.psw
  }
}));

module.exports.sendEmail = (emailToSend,fileName) => {
    const text = 'Hi there, \n \n Please see attached the order report. \n \n Regards, \n \n Sakina Di Pace'
    var mailOptions = {
        from: config.config.email.email,
        to: emailToSend,
        subject: 'Facial Cupping Orders',
        text: text,
        attachments: [
            {
                fileName:fileName,
                path:`./routes/${fileName}`
            }
        ]
      };
      return new Promise(async (resolve) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              resolve(false);
            } else {
              resolve(true);
            }
          });
      })
      
}
  