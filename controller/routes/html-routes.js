const express = require("express");
const router = express.Router();
const { handleHTML } = require("../handlers/html-handler");

router.route("*").get(handleHTML);

module.exports = router;
