const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

router.get("/", userController.user_get_all);

// get user by ID
router.get("/:id", checkAuth, userController.user_get);
// sign up
router.post("/register", userController.register);

// login
router.post("/login", userController.user_login);

// onboarding
router.put("/onboarding", checkAuth, userController.onboarding);

// delete
router.delete("/:userId", checkAuth, userController.user_delete);

module.exports = router;
