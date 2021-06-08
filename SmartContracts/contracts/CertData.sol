pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract CertData {
    struct Multihash {
    bytes32 digest;
    uint8 hashFunction;
    uint8 size;
  }
    struct TokenData {
       
        Multihash ipfshash;
        
        bytes32[] authoritiesAlias;
        address[] authorities;
        
    }
}
