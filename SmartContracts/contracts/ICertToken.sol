pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/token/ERC721/IERC721Enumerable.sol";
import "./CertData.sol";

contract ICertToken is IERC721Enumerable, CertData {
    function mint(
        address _to,
        uint256 _tokenId,
        TokenData memory _tokenData
    ) public;

    function mintOrTransfer(
        address _to,
        uint256 _tokenId,
        TokenData memory _tokenData
    ) public;

    function addWhitelisted(address account) public;
}
