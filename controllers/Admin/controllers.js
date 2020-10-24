"use strict";

const logger = require("../../utils/logger");
const adminW3I = require("../../w3i/w3i");
const config = require("../../config");


const createGroup = async function(req, res) {
  try {
     
    let result = await adminW3I.createGroup(
      req.body.GroupId,
      req.body.Policy,
      req.body.AdminPublicKey,
      config.contracts.FACTORY.address,
      config.contracts.FACTORY.abi
    );
    
    logger.debug(result);
    
    if ((result = true))
      return res.status(200).send({status : "success", code: "200", message: "Successfully submitted the transaction"});
    else {
      let responseText = {
        status: 'error',
        code: 420,
        message: "failed to submit the transaction",
        data: ""}
      res.status(420).send(responseText);;
    }
  } catch (err) {
    if(err.reason == undefined)
    {
      logger.error(JSON.stringify(err));
      let responseText = {
        status: 'error',
        code: 422,
        message: err.reason,
        data: ""}
      res.status(422).send(responseText);
    } else {
      logger.error(err.reason);
      let responseText = {
        status: 'error',
        code: 422,
        message: err.reason,
        data: ""}
      res.status(422).send(responseText);
    }
  }
};


const getGroupAddress = async function(req, res){
  try{
    let result = await adminW3I.getGroupContractAddress(
      req.query.GroupId,
      config.contracts.FACTORY.address,
      config.contracts.FACTORY.abi,
    );

    let responseText = {
      status: 'success',
      code: 200,
      message: 'Successfully queried smart contract',
      data: result}

    return res.status(200).send(responseText);
  } catch (err) {
    if(err.reason == undefined)
    {
      logger.error(err.responseText);
      let responseText = {
        status: 'error',
        code: 422,
        message: err.responseText,
        data: ""}
      res.status(422).send(responseText);
    } else {
      logger.error(err.reason);
      let responseText = {
        status: 'error',
        code: 422,
        message: err.reason,
        data: ""}
      res.status(422).send(responseText);
    }
  }
}

const acceptGroup = async function(req, res) {
  try {
     
    let result = await adminW3I.acceptGroup(
      req.body.GroupId,
      req.body.AdminSignature,
      req.body.AdminPublicKey,
      config.contracts.FACTORY.address,
      config.contracts.FACTORY.abi,
      config.contracts.TOKEN.address,
      config.contracts.TOKEN.abi,
    );
    
    logger.debug(result);
    
    if ((result = true))
      return res.status(200).send({status : "success", code: "200", message: "Successfully submitted the transaction"});
    else {
      let responseText = {
        status: 'error',
        code: 420,
        message: "failed to submit the transaction",
        data: ""}
      res.status(420).send(responseText);;
    }
  } catch (err) {
    if(err.reason == undefined)
    {
      logger.error(err.responseText);
      let responseText = {
        status: 'error',
        code: 422,
        message: err.responseText,
        data: ""}
      res.status(422).send(responseText);
    } else {
      logger.error(err.reason);
      let responseText = {
        status: 'error',
        code: 422,
        message: err.reason,
        data: ""}
      res.status(422).send(responseText);
    }
  }
};


const addSignertoGroup = async function(req, res) {
  try {
     
    let result = await adminW3I.addSignertoGroup(
      req.body.GroupId,
      req.body.SignerAccount,
      req.body.SignerName,
      req.body.AdminSignature,
      req.body.AdminPublicKey,
      config.contracts.FACTORY.address,
      config.contracts.FACTORY.abi,
      config.contracts.ADMIN.abi
    );
    
    logger.debug(result);
    
    if ((result = true))
      return res.status(200).send({status : "success", code: "200", message: "Successfully submitted the transaction"});
    else {
      let responseText = {
        status: 'error',
        code: 420,
        message: "failed to submit the transaction",
        data: ""}
      res.status(420).send(responseText);;
    }
  } catch (err) {
    if(err.reason == undefined)
    {
      logger.error(err.responseText);
      let responseText = {
        status: 'error',
        code: 422,
        message: err.responseText,
        data: ""}
      res.status(422).send(responseText);
    } else {
      let responseText = {
        status: 'error',
        code: 422,
        message: err.reason,
        data: ""}
      res.status(422).send(responseText);
    }
  }
};



module.exports = {
  createGroup,
  getGroupAddress,
  acceptGroup,
  addSignertoGroup
};
