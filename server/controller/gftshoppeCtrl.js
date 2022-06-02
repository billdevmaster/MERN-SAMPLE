const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const GftshoppeUser = require('../models/gftshoppeUsersModel.js');
const config = require('../config.js');

require('dotenv').config();

const signup = async (req, res) => {
    gftshoppeUser = await GftshoppeUser.findOne({address: req.body.address});
    if (gftshoppeUser == null) {
        gftshoppeUser = new GftshoppeUser();
    }
    gftshoppeUser.address = req.body.address;
    gftshoppeUser.email = req.body.email;
    bcrypt.genSalt(10, (err, salt) => {
      if(err) return err;
      // Create the hashed password
      bcrypt.hash(req.body.password, salt, (err, hash) => {
          if(err) return err;
          gftshoppeUser.password = hash;
          // Save the User
          gftshoppeUser.save()
          .then(( result ) => {
              res.json({ status: "success" });
          })
          .catch((err) => {
            console.log(err)
            res.json({ status: "fail" });
          });
      });
  });
}

const profile = async (req, res) => {
    gftshoppeUser = await GftshoppeUser.findOne({address: req.body.address});
    email = ""
    if (gftshoppeUser != null)
        email = gftshoppeUser.email
    res.json({ status: "success", email });
}

const successMint = async (req, res) => {
    let isSentEmail = false;
    console.log("step1")
    gftshoppeUser = await GftshoppeUser.findOne({address: req.body.address});
    console.log("step2")
    if (gftshoppeUser != null) {
        // send email to address
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_APP_PASSWORD
          }
        });
        let emailTemplate = fs.readFileSync('./views/mail-templates/success-mint.html', { encoding: 'utf-8' });

        let content = "<ul>";
        for (n in req.body.tokenIds) {
          content += "<li><p><a href='" + config.contractURI + "?a=" + req.body.tokenIds[n] + "'>" + config.contractURI + "?a=" + req.body.tokenIds[n] + "</a></p></li>";
        }
        let htmlcontent = emailTemplate.replace("[?!content!?]", content);

        const template = handlebars.compile(htmlcontent);
        const replacements = {
            useremail: gftshoppeUser.email,
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
          from: process.env.MAIL_ADDRESS,
          to: gftshoppeUser.email,
          subject: 'Thank you for purchasing GFTs',
          html: htmlToSend
        }
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.json({status: 'success', isSentEmail});
          } else {
            isSentEmail = true;
            res.json({status: 'success', isSentEmail});
          }
        })
    } else {
      res.json({status: 'success', isSentEmail});
    }
}

module.exports = { signup, profile, successMint };