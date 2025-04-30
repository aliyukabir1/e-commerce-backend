const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login
exports.user_login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      // if user exist?
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                { email: user.email, _id: user._id },
                process.env.JWT_KEY,
                {
                  expiresIn: "1h",
                }
              );
              res.status(200).json({
                message: "login successful",
                token: token,
              });
            } else {
              res.status(500).json({
                error: "Incorrect Password",
              });
            }
          }
        );
      } else {
        res.status(500).json({
          error: "User doesnt exist",
        });
      }
    });
};

// signup
exports.register = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        return res.status(500).json({
          error: "user exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res
              .status(400)
              .json({ message: "Registration Failed", user: user.email });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              role: req.body.role,
              userName: req.body.userName,
              address: req.body.address,
              phone: req.body.phone,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                  user: user.email,
                });
              })
              .catch((error) => {
                res.status(500).json(error);
              });
          }
        });
      }
    });
};

// Delete user
exports.user_delete = (req, res) => {
  const id = req.params.userId;
  User.findByIdAndDelete(id)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// get all user
exports.user_get_all = (req, res) => {
  User.find()
    .exec()
    .then((doc) => {
      res.status(200).json({
        body: doc,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// get user by id
exports.user_get = (req, res) => {
  User.findById(req.params.id)
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, body: doc });
    });
};

// exports.onboarding = (req, res) => {
//   const update = {
//     _id: req.userData.id,
//     name: req.body.name,
//     street: req.body.street,
//     apartment: req.body.apartment,
//     city: req.body.city,
//     zip: req.body.zip,
//     country: req.body.country,
//     phone: req.body.phone,
//   };
//   console.log(req.userData);
//   User.findOneAndUpdate({ id: req.userData.id }, update)
//     .exec()
//     .then((user) => {
//       res.status(200).json({
//         message: "Onboarding Successfull",
//       });
//     })
//     .catch((err) => {
//       res.status(400).json({
//         message: "Onboarding Failed!!!",
//       });
//     });
// };
