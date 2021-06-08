"use strict";

const logger = require("../../utils/logger");
const adminW3I = require("../../w3i/w3i");
const config = require("../../config");
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https'})

const adddata = async({content}) => {
  const file = {content :Buffer.from(content)};
  const dataadded = await ipfs.add(file);
  return dataadded[0].hash;

}

const issueCert = async function(req, res) {
  let content = JSON.stringify(req.body.Data)
  const ipfshash =  await adddata({"content":content})
 logger.debug(ipfshash);
  
  try {
    let result = await adminW3I.issueCert(
      req.body.GroupId,
      req.body.TokenOwner,
      req.body.TokenId,
      req.body.Data.Hash,
      req.body.SignerPublicKey,
      req.body.Signature,
      req.body.Data.State,
      req.body.Data.AssetType,
      req.body.Data.URL,
      ipfshash,
      config.contracts.FACTORY.address,
      config.contracts.FACTORY.abi,
      config.contracts.ADMIN.abi
    );
    console.log(config.port)
    
    logger.debug(result);
    
    if ((result = true))
      return res.status(200).send({status : "success", code: "200", message: `Successfully submitted the transaction with ipfs hash =${ipfshash}`});
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

const getCert = async function(req, res) {
  try {
    logger.debug("test")
    let result = await adminW3I.getCert(
      req.query.TokenId,
      config.contracts.TOKEN.address,
      config.contracts.TOKEN.abi
    );
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
    issueCert,
    getCert
};
