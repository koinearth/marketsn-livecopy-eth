"use strict";

const logger = require("../../utils/logger");
const adminW3I = require("../../w3i/w3i");
const config = require("../../config/config.development.json");


const getCert = async function(req, res) {
  try {
    logger.debug("test")
    let result = await adminW3I.getCert(
      req.query.TokenId,
      config.contracts.TOKEN.address,
      config.contracts.TOKEN.abi
      
    );
    console.log(result)
    logger.debug(result)

    let responseText = {
      status: 'success',
      code: 200,
      message: 'Successfully queried smart contract',
      data: result
    }
    logger.debug(responseText)

    return res.status(200).send(responseText);
  } catch (err) {
    if(err.reason == undefined)
    {
      logger.error(err);
      console.log(config.contracts.TOKEN.address)
      
      let responseText = {
        status: 'error',
        code: 422,
        message: err,
        data: ""}
      res.status(422).send(responseText);
    } else {
      logger.error(err.reason);
      let responseText = {
        status: 'error',
        code: 404,
        message: err.reason,
        data: ""}
      res.status(404).send(responseText);
    }
  }
};


module.exports = {
    getCert
};
