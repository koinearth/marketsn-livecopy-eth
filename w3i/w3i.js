const web3Util = require("../utils/web3Util");
const logger = require("../utils/logger");
const config = require("../config");
const ethers = require("ethers");
const initNonce = 0;
const noncemanager = require("../utils/nonceManager.js");
const CID = require('cids')
const bs58 = require('bs58');

noncemanager.getInstance(initNonce, web3Util.nonceFunction);

function getBytes32FromMultiash(multihash) {
  const decoded = bs58.decode(multihash);

  return {
    digest: `0x${decoded.slice(2).toString('hex')}`,
    hashFunction: decoded[0],
    size: decoded[1],
  };
}


const createGroup = async function (
  _groupId,
  _policy,
  _adminAddress,
  _factoryContractAddress,
  _factoryAbi
) {
  let groupId = ethers.utils.formatBytes32String(_groupId.substring(0, 31));

  let factoryContractInstance = web3Util.getContractInstance(
    _factoryContractAddress,
    _factoryAbi
  );
  logger.debug(_policy);
  let status = await factoryContractInstance.create(
    groupId,
    _policy,
    _adminAddress,
    config.apiPubKey
  );
  logger.debug("test");
  logger.debug(status);
  logger.debug("test");
  return true;
};

const acceptGroup = async function (
  _groupId,
  _tokenOwnerSignature,
  _tokenOwnerPublicKey,
  _factoryContractAddress,
  _factoryAbi,
  _tokenContractAddress,
  _tokenAbi
) {
  const adminAddr = await getGroupContractAddress(
    _groupId,
    _factoryContractAddress,
    _factoryAbi
  );
  console.log(config.port)

  logger.debug(adminAddr);

  let tokenContractInstance = web3Util.getContractInstance(
    _tokenContractAddress,
    _tokenAbi
  );

  let sig = await ethers.utils.splitSignature(_tokenOwnerSignature);

  let status = await tokenContractInstance.addWhitelistedbySign(
    adminAddr,
    sig.r,
    sig.s,
    sig.v,
    _tokenOwnerPublicKey
  );
  logger.debug(status);
  return true;
};

const getGroupContractAddress = async function (
  _groupId,
  _factoryContractAddress,
  _factoryAbi
) {
  let groupId = ethers.utils.formatBytes32String(_groupId.substring(0, 31));

  let factoryContractInstance = web3Util.getContractInstance(
    _factoryContractAddress,
    _factoryAbi
  );
  let data = await factoryContractInstance.getAdminAddress(groupId);

  return data;
};

const addSignertoGroup = async function (
  _groupId,
  _signerAccount,
  _signerName,
  _adminSignature,
  _adminPublicKey,
  _factoryContractAddress,
  _factoryAbi,
  _adminAbi
) {
  const adminAddr = await getGroupContractAddress(
    _groupId,
    _factoryContractAddress,
    _factoryAbi
  );

  logger.debug(adminAddr);
  let adminContractInstance = web3Util.getContractInstance(
    adminAddr,
    _adminAbi
  );

  let sig = await ethers.utils.splitSignature(_adminSignature);

  let signerName = ethers.utils.formatBytes32String(_signerName);

  try {
    let status = await adminContractInstance.addWhitelistedbySign(
      _signerAccount,
      signerName,
      sig.r,
      sig.s,
      sig.v,
      _adminPublicKey
    );
  } catch (err) {
    logger.debug(JSON.stringify(err));
    throw err;
  }
  //logger.debug(status)
  return true;
};

const issueCert = async function (
  _groupId,
  _tokenOwner,
  _tokenId,
  _docHash,
  _singerPublicKey,
  _hashSignature,
  _state,
  _assetType,
  _url,
  _ipfshash,
  _factoryContractAddress,
  _factoryAbi,
  _adminAbi
  
) {
  let nonce = 0;
  let state = ethers.utils.formatBytes32String(_state);
  let assetType = ethers.utils.formatBytes32String(_assetType);
  let docHash = String(_docHash).padEnd(66, "0");

  // var buffer = Buffer.from(_ipfshash)
  // var ipfshash = buffer.toString('hex')
  // logger.log("padded hash", docHash);
  // console.log(ipfshash)
  const multihash = getBytes32FromMultiash(_ipfshash)
  
  
  const adminAddr = await getGroupContractAddress(
    _groupId,
    _factoryContractAddress,
    _factoryAbi
  );
  console.log(_groupId)
  console.log(adminAddr)

  logger.debug(adminAddr);
  let adminContractInstance = web3Util.getContractInstance(
    adminAddr,
    _adminAbi
  );
  let sig = await ethers.utils.splitSignature(_hashSignature);
  logger.debug(sig);
  logger.debug(state);
  logger.debug(_tokenId);
  //logger.debug(BigNumber(_tokenId))
  let tokenOwner = ethers.utils.formatBytes32String(_tokenOwner);
  let tokenId = web3Util.stringToIntEncode(_tokenId);

  await noncemanager
    .getInstance()
    .getTransactionPermission()
    .then(() => {
      nonce = noncemanager.getInstance().getNextNonce();
      logger.debug("nonce", nonce);
      if (nonce != 0) {
        try {
          adminContractInstance.issueCert(
            tokenOwner,
            tokenId,
            docHash,
            _singerPublicKey,
            sig.r,
            sig.s,
            sig.v,
            multihash.digest,
            multihash.hashFunction,
            multihash.size,
            { gasLimit: 1800000, nonce: nonce - 1 }
          );
        } catch (err) {
          logger.debug(JSON.stringify(err));
          throw err;
        }
      } else {
        try {
          adminContractInstance.issueCert(
            tokenOwner,
            tokenId,
            docHash,
            _singerPublicKey,
            sig.r,
            sig.s,
            sig.v,
            multihash.digest,
            multihash.hashFunction,
            multihash.size,
            { gasLimit: 1800000 }
          );
        } catch (err) {
          logger.debug(JSON.stringify(err));
          throw err;
        }
      }
    });

  return true;
};

const getCert = async function (_assetId, _tokenContractAddress, _tokenAbi) {
  logger.debug(_assetId);

  let tokenContractInstance = web3Util.getContractInstance(
    _tokenContractAddress,
    _tokenAbi
  );
  console.log(_tokenContractAddress)
  
  

  logger.debug(web3Util.stringToIntEncode(_assetId));
  let result = await tokenContractInstance.getToken(
    web3Util.stringToIntEncode(_assetId)
  );
  


  logger.debug(result);
  console.log(result._tokenData[0][0].digest)

  const hashBytes = Buffer.from(result._tokenData[0][0].digest.slice(2), 'hex');

  
  const multihashBytes = new (hashBytes.constructor)(2 + hashBytes.length);
  multihashBytes[0] = result._tokenData[0][0].hashFunction;
  multihashBytes[1] = result._tokenData[0][0].size;
  multihashBytes.set(hashBytes, 2);

  




  // var formatedResult = {};

  // formatedResult.ownerAddr = result._owner;
  // formatedResult.ownerOrgId = ethers.utils.parseBytes32String(
  //   result._tokenData[0].toAlias
  // );
  // formatedResult.ownerOrgName =
  //   config.orgMapping[
  //     ethers.utils.parseBytes32String(result._tokenData[0].toAlias)
  //   ];
  // formatedResult.oracleContract = result._tokenData[0].oracleContract;
  // formatedResult.groupId = ethers.utils.parseBytes32String(
  //   result._tokenData[0].groupId
  // );
  // formatedResult.assetType = ethers.utils.parseBytes32String(
  //   result._tokenData[0].assetType
  // );

  // formatedResult.history = [];

  // for (var i in result._tokenData) {
  //   var formatedtokenData = {};
  //   //formatedtokenData.oracleContract = result._tokenData[i].oracleContract;
  //   formatedtokenData.state = ethers.utils.parseBytes32String(
  //     result._tokenData[i].state
  //   );
  //   formatedtokenData.hash = result._tokenData[i].hash;
  //   formatedtokenData.url = result._tokenData[i].url;
  //   let tempDate = new Date(
  //     result._tokenData[i].issueDateTime.toNumber() * 1000
  //   );
  //   formatedtokenData.issueDateTime = tempDate.toISOString();
  //   formatedtokenData.signatures = {};
  //   for (var j in result._tokenData[i].authorities) {
  //     let sig = await ethers.utils.joinSignature({
  //       r: result._tokenData[i].sigR[j],
  //       s: result._tokenData[i].sigS[j],
  //       v: result._tokenData[i].sigV[j],
  //       recoveryParam: 0,
  //     });
  //     formatedtokenData.signatures[
  //       config.orgMapping[
  //         ethers.utils.parseBytes32String(
  //           result._tokenData[i].authoritiesAlias[j]
  //         )
  //       ]
  //     ] = sig;
  //   }
  //   logger.debug(formatedtokenData);
  //   formatedResult.history.push(formatedtokenData);
  // }
  // logger.debug(formatedResult);

  return `https://ipfs.infura.io/ipfs/${bs58.encode(multihashBytes)}`;
};

module.exports = {
  createGroup,
  getGroupContractAddress,
  acceptGroup,
  addSignertoGroup,
  issueCert,
  getCert,
};
