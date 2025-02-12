const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

// POST /api/users/signup
router.post("/signup", usersCtrl.create);
// POST /api/users/login
router.post("/login", usersCtrl.login);

// GET /api/users GET ALL VENDORS ONLY
router.get("/vendors", usersCtrl.getVendors);

// GET /api/users GET ALL VENDORS ONLY
router.post("/update", usersCtrl.updateUser);

module.exports = router;
