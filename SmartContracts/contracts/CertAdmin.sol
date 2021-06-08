pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./ICertToken.sol";
import "openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol";
import "openzeppelin-solidity/contracts/access/roles/WhitelistAdminRole.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";
import "./CertData.sol";
import "./Verifier.sol";


contract CertAdmin is WhitelistedRole, CertData, Verifier {
    ICertToken CertToken;

  
    mapping(uint256 => mapping(bytes32 => TokenData)) tokenData;
    mapping(uint256 => mapping(bytes32 => uint256)) tokenStatus;
    mapping(uint256 => mapping(bytes32 => address)) tokerOwner;
    mapping(uint256 => mapping(bytes32 => mapping(address => bool))) tokenAuthSings;
    mapping(bytes32 => address) signerAddress;
    mapping(address => bytes32) signerAddressAlias;

   

    uint256 minSignerRequired;
    address apiAddress;
    bytes32 groupId;
    

    modifier onlyAPI() {
        require(
            msg.sender == apiAddress,
            "APIAddress: Caller is not registered as API address"
        );
        _;
    }

    constructor(
        bytes32 _groupId,
        address _certTokenAddress,
        uint256 _minSignerRequired,
        address _apiAddress
    ) public {
        require(
            _certTokenAddress != address(0) &&
                _minSignerRequired != 0 &&
                _apiAddress != address(0),
            "Invalid Parameters"
        );
        apiAddress = _apiAddress;
        CertToken = ICertToken(_certTokenAddress);
        minSignerRequired = _minSignerRequired;
        groupId = _groupId;
    }

    
    function setIPFShash (bytes32 _digest, uint8 _hashFunction, uint8 _size) private returns (Multihash memory)
    {
        return Multihash(_digest, _hashFunction, _size);
         
    }
    /**
     * @dev public function to propose a cert by signer
     * Reverts if the given token ID already exists.      
     * @param _toAlias The name of the address that will own the minted token
     * @param _tokenId uint256 ID of the token to be minted
     */

    function issueCert(
        bytes32 _toAlias,
        uint256 _tokenId,
        bytes32 _hash,
        address _signerPublicKey,
        bytes32 _sigR,
        bytes32 _sigS,
        uint8 _sigV,
        bytes32 _digest,
        uint8 _hashFunction,
        uint8 _size
        ) public onlyAPI returns (bytes32[]) {
        require(
            isWhitelisted(_signerPublicKey),
            "SignerRole: Signer does not have the Signer role"
        );
        require(
            verifyHash(_hash, _sigR, _sigS, _sigV, _signerPublicKey),
            "VerifyHash: Invalid Signature"
        );

        address _to = signerAddress[_toAlias];
        Multihash memory ipfshash = setIPFShash(_digest, _hashFunction, _size);
        
        TokenData memory _tokenData = tokenData[_tokenId];
        bytes32[] oldipfs = _tokenData[0][0];


        uint256 ti = _tokenId;
        

        if (tokerOwner[ti][_hash] == address(0))
            tokerOwner[ti][_hash] = _to;
        else
            require(
                tokerOwner[ti][_hash] == _to,
                "Ambiguity in to address"
            );

        if (tokenStatus[ti][_hash] == 0) {
            require(htokenAuthSings[ti][_hash][_signerPublicKey] == false);
           
             tokenData[ti][ipfshash.digest].ipfshash = ipfshash;
            
             tokenData[ti][ipfshash.digest].authorities.push(_signerPublicKey);
             tokenData[ti][ipfshash.digest].authoritiesAlias.push(
                signerAddressAlias[_signerPublicKey]
            );
           

            tokenAuthSings[ti][ipfshash.digest][_signerPublicKey] = true;
            tokenStatus[ti][ipfshash.digest] = 1;
        } else if (tokenStatus[ti][ipfshash.digest] == 1) {
            require(tokenAuthSings[ti][ipfshash.digest][_signerPublicKey] == false);
            require(tokenData[ti][ipfshash.digest].ipfshash.digest == _digest);
            tokenData[ti][ipfshash.digest].authorities.push(_signerPublicKey);
            tokenData[ti][ipfshash.digest].authoritiesAlias.push(
                signerAddressAlias[_signerPublicKey]
            );
            tokenAuthSings[ti][ipfshash.digest][_signerPublicKey] = true;
        }
        if (
            tokenData[ti][ipfshash.digest].authorities.length == minSignerRequired
        ) {
            CertToken.mintOrTransfer(
                _to,
                ti,
                tokenData[ti][ipfshash.digest]
            );
            tokenStatus[ti][ipfshash.digest] = 2;
            delete tokenData[ti][ipfshash.digest];
        }
        return oldipfs;
    }

    function addWhitelistedbySign(
        address _account,
        bytes32 _alias,
        bytes32 _sigR,
        bytes32 _sigS,
        uint8 _sigV,
        address _signerPublicKey
    ) public onlyAPI {
        require(
            isWhitelistAdmin(_signerPublicKey),
            "SignerRole: Signer does not have the Signer role"
        );
        bytes32 _hash = bytes32(uint256(_account) << 96);
        require(
            verifyHash(_hash, _sigR, _sigS, _sigV, _signerPublicKey),
            "VerifyHash: Invalid Signature"
        );
        signerAddress[_alias] = _account;
        signerAddressAlias[_account] = _alias;
        _addWhitelisted(_account);
    }
}

contract CertAdminFactory is WhitelistAdminRole {
    ICertToken CertToken;
    address public certTokenAddress;

    mapping(bytes32 => address) groupAdminContract;

    constructor(address _certTokenAddress) public {
        require(_certTokenAddress != address(0));
        certTokenAddress = _certTokenAddress;
        CertToken = ICertToken(_certTokenAddress);
    }

    function create(
        bytes32 _groupId,
        uint256 _minSignerRequire,
        address _adminAddress,
        address _apiAddress
    ) public onlyWhitelistAdmin {
        require(
            groupAdminContract[_groupId] == address(0),
            "Duplicate Request, group admin contract is already crated"
        );
        CertAdmin ca = new CertAdmin(
            _groupId,
            certTokenAddress,
            _minSignerRequire,
            _apiAddress
        );
        ca.addWhitelistAdmin(_adminAddress);
        CertToken.addWhitelisted(address(ca));
        groupAdminContract[_groupId] = address(ca);
    }

    function getAdminAddress(bytes32 _groupId) public view returns (address) {
        return groupAdminContract[_groupId];
    }
}
