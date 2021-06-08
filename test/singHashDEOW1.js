const ethers = require('ethers');


const run = async function() {
// Create a wallet to sign the hash with
let privateKey = '65a675b6b46e46873c909755201f3fc556e556e48fd8b6f358a3ca2251786617';
let wallet = new ethers.Wallet(privateKey);

console.log(wallet.address);
// "0x14791697260E4c9A71f18484C9f997B308e59325"

// let contractAddress = '0x80F85dA065115F576F1fbe5E14285dA51ea39260';
// let contract = new ethers.Contract(contractAddress, abi, provider);

// The hash we wish to sign and verify
//let messageHash = ethers.utils.id("mychannel");

// Note: messageHash is a string, that is 66-bytes long, to sign the
//       binary value, we must convert it to the 32 byte Array that
//       the string represents
//
// i.e.
//   // 66-byte string
//   "0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba"
//
//   ... vs ...
//
//  // 32 entry Uint8Array
//  [ 89, 47, 167, 67, 136, 159, 199, 249, 42, 194, 163,
//    123, 177, 245, 186, 29, 175, 42, 92, 132, 116, 28,
//    160, 224, 6, 29, 36, 58, 46, 103, 7, 186]


//messageHash = "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521110dd8"
//messageHash = "0xb1199f8A4805B0079DA4146D7e7c8E5375e13249" + "000000000000000000000000"
messageHash = "0x3b533dfcc9944a2d3b8b641bc6c8cd04365cac556d476fe2e8854ea521120de6"
let messageHashBytes = ethers.utils.arrayify(messageHash)

// Sign the binary data
let flatSig = await wallet.signMessage(messageHashBytes);

console.log(flatSig)

// For Solidity, we need the expanded-format of a signature
let sig = ethers.utils.splitSignature(flatSig);
}

run()