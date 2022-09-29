var jwt = require('jsonwebtoken');
var User = require("../data/models/users");
var Role = require("../data/models/roles");
var config = require('../config');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err, status:"unable" });
      return;
    }

    if (req.body.role) {
      Role.findOne(
        {
          name: req.body.role 
        },
        (err, roles) => {
            console.log(roles)
          if (err) {
            res.status(500).send({ message: err, roles:roles });
            return;
          }

          user.role = roles.name;
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.role = [role.name];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      console.log(user)

     
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: "ROLE_" + user.role,
        accessToken: token
      });
    });
};