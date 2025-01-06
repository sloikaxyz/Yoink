// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";
import {IAI} from "./interfaces/IAI.sol";
import {StringUtils} from "./libraries/StringUtils.sol";

contract MemeDAO is Ownable {
    using StringUtils for string;

    string public constant SYSTEM_PROMPT =
        "You are an investment advisor for a MemeDAO. "
        "Evaluate the pitch for a memecoin investment based on: "
        "1. Token utility and uniqueness "
        "2. Community engagement potential "
        "3. Meme quality and virality potential "
        "4. Team background and transparency "
        "Respond with a detailed analysis and end with either 'INVEST' or 'PASS' on the last line.";

    IAI public immutable AI_SYSTEM = IAI(address(uint160(0xa1a1a1)));
    IERC20 public immutable daoToken;

    uint256 public constant PITCH_FEE = 0.01 ether;
    uint256 public constant INVESTMENT_AMOUNT = 0.1 ether;

    event PitchSubmitted(
        address indexed pitcher,
        address indexed token,
        string pitch
    );
    event InvestmentMade(address indexed token, uint256 amount);
    event TokensDistributed(address indexed pitcher, uint256 amount);

    error InsufficientPitchFee();
    error InvalidTokenAddress();
    error TransferFailed();

    constructor(address _daoToken) Ownable(msg.sender) {
        daoToken = IERC20(_daoToken);
    }

    function pitchToken(address token, string calldata pitch) external payable {
        if (msg.value < PITCH_FEE) revert InsufficientPitchFee();
        if (token == address(0)) revert InvalidTokenAddress();

        // Construct full prompt with context
        string memory fullPrompt = string.concat(
            SYSTEM_PROMPT,
            "\n\nToken Address: ",
            addressToString(token),
            "\n\nPitch: ",
            pitch
        );

        // Get AI response
        string memory response = AI_SYSTEM.chat(fullPrompt, pitch);
        bool shouldInvest = checkInvestmentDecision(response);

        emit PitchSubmitted(msg.sender, token, pitch);

        if (shouldInvest) {
            // Make investment
            (bool success, ) = payable(token).call{value: INVESTMENT_AMOUNT}(
                ""
            );
            if (!success) revert TransferFailed();

            emit InvestmentMade(token, INVESTMENT_AMOUNT);

            // Distribute DAO tokens to pitcher
            uint256 rewardAmount = daoToken.balanceOf(address(this)) / 100; // 1% of DAO tokens
            daoToken.transfer(msg.sender, rewardAmount);

            emit TokensDistributed(msg.sender, rewardAmount);
        } else {
            // If not investing, give them some DAO tokens as consolation
            uint256 consolationAmount = daoToken.balanceOf(address(this)) /
                1000; // 0.1% of DAO tokens
            daoToken.transfer(msg.sender, consolationAmount);

            emit TokensDistributed(msg.sender, consolationAmount);
        }
    }

    function checkInvestmentDecision(
        string memory response
    ) internal pure returns (bool) {
        // Handle empty response
        bytes memory responseBytes = bytes(response);
        if (responseBytes.length == 0) {
            return false;
        }

        // Find start of last non-empty line
        uint256 lastLineStart = 0;
        uint256 lastNonEmptyLineStart = 0;

        for (uint256 i = 0; i < responseBytes.length; i++) {
            if (responseBytes[i] == "\n") {
                if (i > lastLineStart && i - lastLineStart > 0) {
                    // Save position only if line had content
                    lastNonEmptyLineStart = lastLineStart;
                }
                lastLineStart = i + 1;
            }
        }

        // Check if final line has content
        if (responseBytes.length > lastLineStart) {
            lastNonEmptyLineStart = lastLineStart;
        }

        bytes memory investBytes = bytes("INVEST");
        uint256 remainingLength = responseBytes.length - lastNonEmptyLineStart;

        // Early return if remaining length is too short
        if (remainingLength < investBytes.length) {
            return false;
        }

        // Check for exact "INVEST" match
        for (uint256 i = 0; i < investBytes.length; i++) {
            if (
                i >= remainingLength ||
                responseBytes[lastNonEmptyLineStart + i] != investBytes[i]
            ) {
                return false;
            }
        }

        // If we've matched INVEST, ensure rest of line is empty or whitespace
        for (
            uint256 i = lastNonEmptyLineStart + investBytes.length;
            i < responseBytes.length;
            i++
        ) {
            bytes1 c = responseBytes[i];
            if (c != " " && c != "\t" && c != "\n" && c != "\r") {
                return false;
            }
        }

        return true;
    }

    function addressToString(
        address _addr
    ) internal pure returns (string memory) {
        bytes memory data = abi.encodePacked(_addr);
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < data.length; i++) {
            str[2 + i * 2] = alphabet[uint256(uint8(data[i] >> 4))];
            str[2 + i * 2 + 1] = alphabet[uint256(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }

    receive() external payable {}
}
