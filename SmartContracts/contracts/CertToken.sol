pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol";
import "./CertData.sol";
import "./Verifier.sol";

contract CertToken is ERC721Enumerable, WhitelistedRole, CertData, Verifier {
    constructor() public ERC721Enumerable() {}

    mapping(uint256 => TokenData[]) tokenData;
    mapping(bytes32 => uint256) tokenHash;

    /**
     * @dev public function to mint or transfer token.
     * Reverts if the given token ID already exists.
     * @param _to The address that will own the minted token
     * @param _tokenId uint256 ID of the token to be minted
     */
    function mintOrTransfer(
        address _to,
        uint256 _tokenId,
        TokenData memory _tokenData
    ) public onlyWhitelisted {
        if (!_exists(_tokenId)) {
            mint(_to, _tokenId, _tokenData);
        } else {
            address owner = ownerOf(_tokenId);
            if (owner != _to) {
                transferFrom(owner, _to, _tokenId, _tokenData);
            } else {
                mint(_to, _tokenId, _tokenData);
            }
        }
    }

    /**
     * @dev public function to mint a new token.
     * Reverts if the given token ID already exists.
     * @param _to The address that will own the minted token
     * @param _tokenId uint256 ID of the token to be minted
     */
    function mint(
        address _to,
        uint256 _tokenId,
        TokenData memory _tokenData
    ) public onlyWhitelisted {
        require(tokenHash[_tokenData.hash] == 0, "Hash already existing");
        if (!_exists(_tokenId)) super._mint(_to, _tokenId);
        tokenData[_tokenId].push(_tokenData);
        tokenHash[_tokenData.hash] = _tokenId;
    }

    /**
     * @dev public function to mint a new token.
     * Reverts if the given token ID already exists.
     * @param _from current owner of the token
     * @param _to address to receive the ownership of the given token ID
     * @param _tokenId uint256 ID of the token to be minted
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        TokenData memory _tokenData
    ) public onlyWhitelisted {
        require(tokenHash[_tokenData.hash] == 0, "Hash already existing");
        super._transferFrom(_from, _to, _tokenId);
        tokenData[_tokenId].push(_tokenData);
        tokenHash[_tokenData.hash] = _tokenId;
    }

    function getToken(uint256 _tokenId)
        public
        view
        returns (address _owner, TokenData[] memory _tokenData)
    {
        _owner = ownerOf(_tokenId);
        _tokenData = tokenData[_tokenId];
    }

    function getTokenbyHash(bytes32 _tokenHash)
        public
        view
        returns (address _owner, TokenData[] memory _tokenData)
    {
        _owner = ownerOf(tokenHash[_tokenHash]);
        _tokenData = tokenData[tokenHash[_tokenHash]];
    }

    function addWhitelistedbySign(
        address _account,
        bytes32 _sigR,
        bytes32 _sigS,
        uint8 _sigV,
        address _signerPublicKey
    ) public {
        require(
            isWhitelistAdmin(_signerPublicKey),
            "SignerRole: Signer does not have the Admin role"
        );
        bytes32 _hash = bytes32(uint256(_account) << 96);
        require(
            verifyHash(_hash, _sigR, _sigS, _sigV, _signerPublicKey),
            "VerifyHash: Invalid Signature"
        );
        _addWhitelisted(_account);
    }
}
