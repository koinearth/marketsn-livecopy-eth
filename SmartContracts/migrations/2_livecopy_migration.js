var CertToken = artifacts.require("CertToken");
var CertAdminFactory = artifacts.require("CertAdminFactory");
var CertAdmin = artifacts.require("CertAdmin");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(CertToken);
  await deployer.deploy(CertAdminFactory, CertToken.address);
  await CertToken.deployed().then(async function (instance) {
    await instance.addWhitelistAdmin.sendTransaction(CertAdminFactory.address);
  });
  var text = `{"FACTORY":{"address":"${
    CertAdminFactory.address
  }","abi":${JSON.stringify(CertAdminFactory.abi)}},
                 "ADMIN":{"abi":${JSON.stringify(CertAdmin.abi)}},
                 "TOKEN":{"address":"${
                   CertToken.address
                 }","abi":${JSON.stringify(CertToken.abi)}}}`;

  console.log(text);
  var obj = JSON.parse(text);
  // //console.log(obj);
};
