// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "openzeppelin-contracts/token/ERC721/ERC721.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";
import {IAI} from "./interfaces/IAI.sol";
import {Strings} from "openzeppelin-contracts/utils/Strings.sol";
import {StringUtils} from "./libraries/StringUtils.sol";

contract ArtMerchant is ERC721, Ownable {
    using Strings for uint256;
    using StringUtils for string;

    string public constant SYSTEM_PROMPT =
        "You are an eccentric art merchant who loves to haggle. "
        "You're selling unique AI-generated art pieces. "
        "Evaluate the buyer's haggling attempt considering: "
        "1. Their negotiation style and creativity "
        "2. The asking price vs market value "
        "3. Their appreciation for art "
        "Respond with a colorful story about the negotiation and end with either 'DEAL' or 'NO DEAL'";

    string public constant ART_PROMPT =
        "Create a unique piece of generative art. Describe it in vivid detail. "
        "Include: style, colors, patterns, meaning, and suggested display location. "
        "Make it sound valuable and unique.";

    IAI public immutable AI_SYSTEM = IAI(address(uint160(0xa1a1a1)));

    struct ArtPiece {
        string description;
        uint256 askingPrice;
        bool sold;
    }

    mapping(uint256 => ArtPiece) public artPieces;
    uint256 private _tokenIdCounter;

    event ArtPieceCreated(
        uint256 indexed tokenId,
        string description,
        uint256 askingPrice
    );
    event HaggleAttempt(
        uint256 indexed tokenId,
        address indexed buyer,
        string haggle,
        bool success
    );
    event ArtPieceSold(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 finalPrice
    );

    error InvalidArtPiece();
    error AlreadySold();
    error InsufficientPayment();
    error TransferFailed();

    constructor() ERC721("AI Art Merchant", "AIAM") Ownable(msg.sender) {}

    function createArtPiece(uint256 askingPrice) external onlyOwner {
        string memory artDescription = _getArtDescription();

        uint256 tokenId = _tokenIdCounter++;
        artPieces[tokenId] = ArtPiece({
            description: artDescription,
            askingPrice: askingPrice,
            sold: false
        });

        emit ArtPieceCreated(tokenId, artDescription, askingPrice);
    }

    function buy(uint256 tokenId, string calldata haggle) external payable {
        ArtPiece storage art = artPieces[tokenId];
        if (art.askingPrice == 0) revert InvalidArtPiece();
        if (art.sold) revert AlreadySold();
        if (msg.value < art.askingPrice) revert InsufficientPayment();

        // Construct haggle prompt
        string memory hagglePrompt = _getHagglePrompt(art, haggle);

        // Get merchant's response
        string memory response = AI_SYSTEM.chat(hagglePrompt, haggle);
        bool deal = _checkDealMade(response);

        emit HaggleAttempt(tokenId, msg.sender, haggle, deal);

        if (deal) {
            art.sold = true;
            _safeMint(msg.sender, tokenId);
            emit ArtPieceSold(tokenId, msg.sender, msg.value);
        } else {
            // Refund payment if no deal
            (bool success, ) = payable(msg.sender).call{value: msg.value}("");
            if (!success) revert TransferFailed();
        }
    }

    function _getArtDescription() internal returns (string memory) {
        return AI_SYSTEM.chat(ART_PROMPT, "Create new art");
    }

    function _getHagglePrompt(
        ArtPiece memory art,
        string memory haggle
    ) internal pure returns (string memory) {
        return
            string.concat(
                SYSTEM_PROMPT,
                "\n\nArt Description: ",
                art.description,
                "\n\nAsking Price: ",
                art.askingPrice.toString(),
                " ETH",
                "\n\nBuyer's Offer: ",
                haggle
            );
    }

    function _checkDealMade(
        string memory response
    ) internal pure returns (bool) {
        bytes memory responseBytes = bytes(response);
        bytes memory dealStr = bytes("DEAL");

        uint256 lastLineStart = 0;

        // Find start of last line
        for (uint256 i = 0; i < responseBytes.length; i++) {
            if (responseBytes[i] == "\n") {
                lastLineStart = i + 1;
            }
        }

        // Get last line
        bytes memory lastLine = new bytes(responseBytes.length - lastLineStart);
        for (uint256 i = lastLineStart; i < responseBytes.length; i++) {
            lastLine[i - lastLineStart] = responseBytes[i];
        }

        // Check if last line is "DEAL"
        if (lastLine.length == dealStr.length) {
            bool isDeal = true;
            for (uint256 i = 0; i < dealStr.length; i++) {
                if (lastLine[i] != dealStr[i]) {
                    isDeal = false;
                    break;
                }
            }
            if (isDeal) return true;
        }

        return false;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner()).call{value: balance}("");
        if (!success) revert TransferFailed();
    }

    receive() external payable {}
}
