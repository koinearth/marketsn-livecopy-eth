const logger = require("./logger");
const ethers = require("ethers");
const config = require("../config");
const Web3 = require("web3");

const privateKey = config.apiPrivKey;
const url = config.rpc;

const provider = new ethers.providers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);
const web3 = new Web3(new Web3.providers.HttpProvider(url));

const initNonce = 0;

var nonceFunction = () => {
  return new Promise((resolve, reject) => {
    logger.debug("asking web3 for current nonce..");
    resolve(wallet.getTransactionCount());
  });
};

const getContractInstance = function (_contractAddress, _ABI) {
  //return new web3.eth.Contract(_ABI, _contractAddress);
  let contract = new ethers.Contract(_contractAddress, _ABI, wallet);
  return contract;
};

const stringToIntEncode = function (_id) {
  logger.debug(_id);
  logger.debug(web3.utils.hexToNumberString(web3.utils.asciiToHex(_id)));
  return web3.utils.hexToNumberString(web3.utils.asciiToHex(_id));
};

exports.getContractInstance = getContractInstance;
exports.stringToIntEncode = stringToIntEncode;
exports.nonceFunction = nonceFunction;
