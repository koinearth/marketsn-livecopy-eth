const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

const { createGroup, getGroupAddress, acceptGroup, addSignertoGroup} = controllers;



router.post("/", createGroup);
router.patch("/", acceptGroup);
router.put("/", addSignertoGroup);
router.get("/", getGroupAddress);

module.exports = router;
