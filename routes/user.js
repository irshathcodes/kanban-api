const express = require("express");
const router = express.Router();

const { getUsername } = require("../controllers/user");

router.get("/", getUsername);

module.exports = router;
