const client = require("@mailchimp/mailchimp_marketing");
const nodemailer = require('nodemailer');
const fs = require("fs");
require('dotenv').config();

client.setConfig({
  apiKey: process.env.MAILCHIMP_APIKEY,
  server: process.env.SERVER_PREFIX,
});
const captureEmail = async (req, res) => {
  client.lists.addListMember(process.env.LIST_ID, {
      email_address: req.body.email,
      status: "subscribed",
      tags: ["gftshoppe"]
  })
  .then(async result => {
    // send email to address
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.SENDER_EMAIL,
    //     pass: process.env.APP_KEY
    //   }
    // });
    // let emailTemplate = await fs.readFileSync('./views/mail-template.html', { encoding: 'utf-8' });
    // const mailOptions = {
    //   from: process.env.SENDER_EMAIL,
    //   to: req.body.email,
    //   subject: 'Congratulations Signing UP to GFTshoppe.',
    //   html: emailTemplate
    // }
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // })
    return res.json({status: 'success'});
  })
  .catch(err => {
    console.log(err)
    const errMsg = JSON.parse(err.response.text);
    let message = errMsg.detail;
    if (errMsg.title == 'Member Exists') {
      message = req.body.email + ' is already a list member.';
    }
    return res.json({status: 'fail', message: message});
  });
  
}

module.exports = { captureEmail };