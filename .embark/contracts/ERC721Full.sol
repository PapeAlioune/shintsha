pragma solidity ^0.5.0;

import "C:/Users/g14m1190/Documents/GitHub/shinstha/.embark/contracts/ERC721.sol";
import "C:/Users/g14m1190/Documents/GitHub/shinstha/.embark/contracts/ERC721Enumerable.sol";
import "C:/Users/g14m1190/Documents/GitHub/shinstha/.embark/contracts/ERC721Metadata.sol";

/**
 * @title Full ERC721 Token
 * This implementation includes all the required and some optional functionality of the ERC721 standard
 * Moreover, it includes approve all functionality using operator terminology
 * @dev see https://eips.ethereum.org/EIPS/eip-721
 */
contract ERC721Full is ERC721, ERC721Enumerable, ERC721Metadata {
    constructor (string memory name, string memory symbol) public ERC721Metadata(name, symbol) {
        // solhint-disable-previous-line no-empty-blocks
    }
}
