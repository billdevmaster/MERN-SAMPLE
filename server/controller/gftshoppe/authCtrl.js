const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const GftshoppeUser = require('../../models/gftshoppeUsersModel.js');
const config = require('../../config.js');

require('dotenv').config();

const signup = async (req, res) => {
    gftshoppeUser = new GftshoppeUser();
    gftshoppeUser.email = req.body.formdata.email;
    bcrypt.genSalt(10, (err, salt) => {
      if(err) return err;
      // Create the hashed password
      bcrypt.hash(req.body.formdata.password, salt, (err, hash) => {
          if(err) return err;
          gftshoppeUser.password = hash;
          // Save the User
          gftshoppeUser.save()
          .then(( result ) => {
              res.json({ status: "success" });
          })
          .catch((err) => {
            console.log(err)
            if (err.code === 11000) 
                res.json({ status: "fail", error: "Email is duplicate" });
            else
                res.json({ status: "fail", error: err.errmsg });
          });
      });
  });
}

const signin = async (req, res) => {
    GftshoppeUser.findOne({email: req.body.formdata.email}, (err, user) => {
        if (err) throw err;
        if (Boolean(user)) {
            // Match Password
            bcrypt.compare(req.body.formdata.password, user.password, (err, isMatch) => {
                if (err) return err;
                if (isMatch) {
                    const token = jwt.sign({
                            id: user._id,
                            email: user.email
                        }, config.jwtSecret);
                    res.json({ token: token, status: 'success', user: user })
                } else {
                   res.json({ error: 'Invalid Username or Password', status: "fail" });
                }
            });
        } else {
            res.json({ error: 'Invalid Username or Password', status: "fail" });
        }
    });
}

module.exports = { signup, signin };