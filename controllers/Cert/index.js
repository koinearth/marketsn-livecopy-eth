const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

const { issueCert, getCert} = controllers;



router.post("/", issueCert);
router.get("/", getCert);

module.exports = router;
