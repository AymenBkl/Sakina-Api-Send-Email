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

module.exports.sendEmail() = (emailToSend) => {
    var mailOptions = {
        from: config.config.email.email,
        to: emailToSend,
        subject: 'New Filtred Data',
        text: 'That was easy!'
      };
      return new Promise(async (resolve) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
      })
      
}
  