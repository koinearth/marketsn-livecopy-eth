pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract CertData {
    struct TokenData {
        address oracleContract;
        bytes32 groupId;
        address to;
        bytes32 toAlias;
        bytes32 assetType;
        bytes32 state;
        bytes32 hash;
        uint256 issueDateTime;
        string url;
        bytes32[] authoritiesAlias;
        address[] authorities;
        bytes32[] sigR;
        bytes32[] sigS;
        uint8[] sigV;
    }
}
