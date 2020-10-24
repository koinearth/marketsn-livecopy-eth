const ethers = require("ethers");

const CertAdminFactory = artifacts.require("CertAdminFactory");
const CertToken = artifacts.require("CertToken");
const CertAdmin = artifacts.require("CertAdmin");
var certAdminInstance;

const adminPv =
  "7ddf538c8b7f9d77bbf3fa0f8811db281933b12152978d775346e0202ee363a7";
const admin = "0x943F586C1f08F7b62f460de97B55E5e43c716e58";

const certAdminPv =
  "4fdd44075e2f60a1ed85ad631213a8cd1b9ca7d71a5b7a0a02a01a66f1ca7d8d";
const certAdmin = "0xb1199f8A4805B0079DA4146D7e7c8E5375e13249";

// const signer1Pv = "8ece0a668843e835233ff0352e00ea4de4d9698eba4d0e1191fabe6f373c520a"
// const signer1 = "0xAF90e736E224700BC7baee19Bd7f048aCC58F5F3"

const signer1Pv =
  "7ddf538c8b7f9d77bbf3fa0f8811db281933b12152978d775346e0202ee363a7";
const signer1 = "0x943F586C1f08F7b62f460de97B55E5e43c716e58";

const signer2Pv =
  "b871b16c882e3a9a735bac8993728c33c6550abdf15a2f47a2972bf17341e3bc";
const signer2 = "0x2364B175a20D6B112Ab861b5fB39B44b5E8E8576";

const signer3Pv =
  "a08b582f2b0a3c5f551532225c2246ae15ae6caccf5bd66214c0526c42c4a4f6";
const signer3 = "0xe4B4414f0827DFcB3c6e34c9fA70500570dbda2D";

const owner1Pv =
  "16e5b398e262729e03f2dc0ec950e7a17abd76cb719d3ed594b9354c255e2470";
const owner1 = "0x6A8477d3647d9a8DB90c893FE672facED4d6ECa2";

const owner2Pv =
  "ac27dcb001b699448829a688d6bcb0dcaf3c25737cc586632575b0cbb4193e49";
const owner2 = "0x8b4ecF58492F7A23A23661056a9020f2FbFb743c";

const apiPKPv =
  "f119f52e0f3fad9f19cbd5afe76fe510e004905220fb24fde9d3ca9d47a46e6b";
const apiPK = "0x96B6E2A38F6A0578E056D90626Eb9f8BF3738E18";
// const apiPKPv = "80148db8d9edd5d3155fd6bbc89c38a8fce0ad38fa4128f64e2e767cec983318"
// const apiPK = "0xAA790E3e21974a43Cac49811e2A9cBC88f3bC392"

const receiver = "0x96B6E2A38F6A0578E056D90626Eb9f8BF3738E18";
const issuer = "0xe4B4414f0827DFcB3c6e34c9fA70500570dbda2D";

contract("CertToken", function () {
  it("should create the certAdmin for group", function () {
    return CertAdminFactory.deployed().then(async function (instance) {
      await instance.create.sendTransaction(
        web3.utils.asciiToHex("G1"),
        2,
        certAdmin,
        apiPK,
        { from: admin }
      );
    });
  });

  it("should get the admin contract address for created group", function () {
    return CertAdminFactory.deployed().then(async function (instance) {
      const contractAddr = await instance.getAdminAddress.call(
        web3.utils.asciiToHex("G1"),
        { from: certAdmin }
      );
      certAdminInstance = await CertAdmin.at(contractAddr);
      //console.log(contractAddr);
    });
  });

  // it("Token Admin shold whilelist CertAdmin", function () {
  //   return CertToken.deployed().then(async function (instance) {
  //     let wallet = new ethers.Wallet(adminPv);
  //     //console.log(certAdminInstance.address)
  //     let messageHashBytes = ethers.utils.arrayify(
  //       certAdminInstance.address + "000000000000000000000000"
  //     );
  //     let flatSig = await wallet.signMessage(messageHashBytes);
  //     //console.log(flatSig);
  //     let sig = await ethers.utils.splitSignature(flatSig);
  //     //console.log(sig)
  //     await instance.addWhitelistedbySign.sendTransaction(
  //       certAdminInstance.address,
  //       sig.r,
  //       sig.s,
  //       sig.v,
  //       admin
  //     );
  //   });
  // });

  it("CertAdmin should be able to add signer1", async function () {
    let signer = signer1;
    let wallet = new ethers.Wallet(certAdminPv);
    let messageHashBytes = await ethers.utils.arrayify(
      signer + "000000000000000000000000"
    );
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    await certAdminInstance.addWhitelistedbySign.sendTransaction(
      signer,
      web3.utils.asciiToHex("DEOW1"),
      sig.r,
      sig.s,
      sig.v,
      certAdmin,
      { from: apiPK }
    );
  });

  it("CertAdmin should be able to add signer2", async function () {
    let signer = signer2;
    let wallet = new ethers.Wallet(certAdminPv);
    let messageHashBytes = await ethers.utils.arrayify(
      signer + "000000000000000000000000"
    );
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    await certAdminInstance.addWhitelistedbySign.sendTransaction(
      signer,
      web3.utils.asciiToHex("DESU1"),
      sig.r,
      sig.s,
      sig.v,
      certAdmin,
      { from: apiPK }
    );
  });

  it("CertAdmin should be able to add signer3", async function () {
    let signer = signer3;
    let wallet = new ethers.Wallet(certAdminPv);
    let messageHashBytes = await ethers.utils.arrayify(
      signer + "000000000000000000000000"
    );
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    await certAdminInstance.addWhitelistedbySign.sendTransaction(
      signer,
      web3.utils.asciiToHex("DESU2"),
      sig.r,
      sig.s,
      sig.v,
      certAdmin,
      { from: apiPK }
    );
  });

  it("should get the token supply", function () {
    return CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      //console.log(result.toNumber());
      assert.equal(result, 0);
    });
  });

  it("Signer1 should be able to call issue certificate - certificate should be in queue", async function () {
    let certHash =
      "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110dd4";
    let wallet = new ethers.Wallet(signer1Pv);
    let messageHashBytes = await ethers.utils.arrayify(certHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    console.log(flatSig);
    let sig = await ethers.utils.splitSignature(flatSig);
    let txInfo = await certAdminInstance.issueCert.sendTransaction(
      web3.utils.asciiToHex("DEOW1"),
      1,
      certHash,
      signer1,
      sig.r,
      sig.s,
      sig.v,
      certHash,
      certHash,
      "testurl",
      { from: apiPK }
    );
    // let tx = await web3.eth.getTransaction(txInfo.tx);
    // let gasCost = tx.gasPrice * (txInfo.receipt.gasUsed);
    //console.log(gasCost);
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      assert.equal(result, 0);
    });
  });

  it("Signer2 should be able to call issue certificate - certificate should be in issued", async function () {
    let certHash =
      "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110dd4";
    let wallet = new ethers.Wallet(signer2Pv);
    let messageHashBytes = await ethers.utils.arrayify(certHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    let txInfo = await certAdminInstance.issueCert.sendTransaction(
      web3.utils.asciiToHex("DEOW1"),
      1,
      certHash,
      signer2,
      sig.r,
      sig.s,
      sig.v,
      certHash,
      certHash,
      "testurl",
      { from: apiPK }
    );
    // let tx = await web3.eth.getTransaction(txInfo.tx);
    // let gasCost = tx.gasPrice * (txInfo.receipt.gasUsed);
    //console.log(gasCost);
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      assert.equal(result, 1);
    });
  });

  it("Signer3 should be able to call issue certificate - request should be ignored", async function () {
    let certHash =
      "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110dd4";
    let wallet = new ethers.Wallet(signer3Pv);
    let messageHashBytes = await ethers.utils.arrayify(certHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    let txInfo = await certAdminInstance.issueCert.sendTransaction(
      web3.utils.asciiToHex("DEOW1"),
      1,
      certHash,
      signer3,
      sig.r,
      sig.s,
      sig.v,
      certHash,
      certHash,
      "testurl",
      { from: apiPK }
    );
    // let tx = await web3.eth.getTransaction(txInfo.tx);
    // let gasCost = tx.gasPrice * (txInfo.receipt.gasUsed);
    //console.log(gasCost);
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      assert.equal(result, 1);
    });
  });

  it("Signer3 should be able to call issue certificate (new hash and new id) - certificate should be in queue", async function () {
    let certHash =
      "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110d00";
    let wallet = new ethers.Wallet(signer3Pv);
    let messageHashBytes = await ethers.utils.arrayify(certHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    let txInfo = await certAdminInstance.issueCert.sendTransaction(
      web3.utils.asciiToHex("DESU1"),
      2,
      certHash,
      signer3,
      sig.r,
      sig.s,
      sig.v,
      certHash,
      certHash,
      "testurl",
      { from: apiPK }
    );
    // let tx = await web3.eth.getTransaction(txInfo.tx);
    // let gasCost = tx.gasPrice * (txInfo.receipt.gasUsed);
    //console.log(gasCost);
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      assert.equal(result, 1);
    });
  });

  it("Signer2 should be able to call issue certificate (new hash and pending id) - certificate should be in queue", async function () {
    let certHash =
      "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110d02";
    let wallet = new ethers.Wallet(signer2Pv);
    let messageHashBytes = await ethers.utils.arrayify(certHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    let txInfo = await certAdminInstance.issueCert.sendTransaction(
      web3.utils.asciiToHex("DESU1"),
      2,
      certHash,
      signer2,
      sig.r,
      sig.s,
      sig.v,
      certHash,
      certHash,
      "testurl",
      { from: apiPK }
    );
    // let tx = await web3.eth.getTransaction(txInfo.tx);
    // let gasCost = tx.gasPrice * (txInfo.receipt.gasUsed);
    //console.log(gasCost);
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      assert.equal(result, 1);
    });
  });

  it("Signer2 should be able to call issue certificate (pending hash and pending id) - certificate should be in issued", async function () {
    let certHash =
      "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110d00";
    let wallet = new ethers.Wallet(signer2Pv);
    let messageHashBytes = await ethers.utils.arrayify(certHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    let txInfo = await certAdminInstance.issueCert.sendTransaction(
      web3.utils.asciiToHex("DESU1"),
      2,
      certHash,
      signer2,
      sig.r,
      sig.s,
      sig.v,
      certHash,
      certHash,
      "testurl",
      { from: apiPK }
    );
    // let tx = await web3.eth.getTransaction(txInfo.tx);
    // let gasCost = tx.gasPrice * (txInfo.receipt.gasUsed);
    //console.log(gasCost);
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      assert.equal(result, 2);
    });
  });

  it("Signer3 should be able to call issue certificate  (pending other hash and pending id)- certificate should be in issued", async function () {
    let certHash =
      "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110d02";
    let wallet = new ethers.Wallet(signer3Pv);
    let messageHashBytes = await ethers.utils.arrayify(certHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    let txInfo = await certAdminInstance.issueCert.sendTransaction(
      web3.utils.asciiToHex("DESU1"),
      2,
      certHash,
      signer3,
      sig.r,
      sig.s,
      sig.v,
      certHash,
      certHash,
      "testurl",
      { from: apiPK }
    );
    // let tx = await web3.eth.getTransaction(txInfo.tx);
    // let gasCost = tx.gasPrice * (txInfo.receipt.gasUsed);
    //console.log(gasCost);
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      assert.equal(result, 2);
    });
  });

  it("Should get the token data", async function () {
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.getToken.call(2, { from: owner1 });
      console.log(JSON.stringify(result));
    });
  });

  it("Should get the token data", async function () {
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.getTokenbyHash.call(
        "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110d02",
        { from: owner1 }
      );
      console.log(JSON.stringify(result));
    });
  });

  it("Signer1 should be able to call re-issue certificate - certificate should be in queue with different owner", async function () {
    let certHash =
      "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110dd6";
    let wallet = new ethers.Wallet(signer1Pv);
    let messageHashBytes = await ethers.utils.arrayify(certHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    console.log(flatSig);
    let sig = await ethers.utils.splitSignature(flatSig);
    let txInfo = await certAdminInstance.issueCert.sendTransaction(
      web3.utils.asciiToHex("DESU1"),
      1,
      certHash,
      signer1,
      sig.r,
      sig.s,
      sig.v,
      certHash,
      certHash,
      "testurl",
      { from: apiPK }
    );
    // let tx = await web3.eth.getTransaction(txInfo.tx);
    // let gasCost = tx.gasPrice * (txInfo.receipt.gasUsed);
    //console.log(gasCost);
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      assert.equal(result, 2);
    });
  });

  it("Signer2 should be able to call re-issue certificate - certificate should be transferred to new owner", async function () {
    let certHash =
      "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110dd6";
    let wallet = new ethers.Wallet(signer2Pv);
    let messageHashBytes = await ethers.utils.arrayify(certHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = await ethers.utils.splitSignature(flatSig);
    let txInfo = await certAdminInstance.issueCert.sendTransaction(
      web3.utils.asciiToHex("DESU1"),
      1,
      certHash,
      signer2,
      sig.r,
      sig.s,
      sig.v,
      certHash,
      certHash,
      "testurl",
      { from: apiPK }
    );
    // let tx = await web3.eth.getTransaction(txInfo.tx);
    // let gasCost = tx.gasPrice * (txInfo.receipt.gasUsed);
    //console.log(gasCost);
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.totalSupply.call();
      assert.equal(result, 2);
    });
  });

  it("Should get the token data", async function () {
    await CertToken.deployed().then(async function (instance) {
      const result = await instance.getToken.call(1, { from: owner1 });
      console.log(JSON.stringify(result));
    });
  });
});
