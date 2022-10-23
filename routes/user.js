const express = require("express");
const router = express.Router();

const { getUsername, deleteAccount } = require("../controllers/user");

router.get("/", getUsername);

router.delete("/deleteAccount", deleteAccount);

module.exports = router;
