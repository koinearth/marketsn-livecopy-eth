const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

const { getCert} = controllers;

router.get("/", getCert);

module.exports = router;
