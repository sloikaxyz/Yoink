// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IAI} from "./interfaces/IAI.sol";

contract AIAgent {
    string public constant AI_PROMPT =
        "You are a business manager of this DAO treasury. "
        "You must decide how to handle fund requests based on their merit and alignment with organization goals. "
        "Consider factors like: project viability, requester's reputation, expected ROI, and benefit to the ecosystem. "
        "Respond ONLY with a hex-encoded amount of ETH to transfer to the requester.";

    IAI public immutable AI_SYSTEM = IAI(address(uint160(0xa1a1a1)));

    error CallFailed();
    error InvalidResponse();

    receive() external payable {}

    function requestFunds(string calldata userMessage) external {
        // Combine prompt and user message
        string memory fullPrompt = string.concat(
            AI_PROMPT,
            "\n\nCurrent balance: ",
            string(abi.encode(address(this).balance)),
            "\n\nRequestor address: ",
            string(abi.encode(uint160(msg.sender)))
        );

        // Call AI system to get response
        string memory response = AI_SYSTEM.chat(fullPrompt, userMessage);

        if (bytes(response).length == 0) revert InvalidResponse();

        // Remove leading "0x" if present
        if (bytes(response)[0] == "0" && bytes(response)[1] == "x") {
            response = substring(response, 2, bytes(response).length);
        }

        // Convert hex string to bytes
        bytes memory responseBytes = stringToHex(response);

        uint256 responseValue = uint256(bytes32(responseBytes));

        // Call transfer function with the response bytes
        (bool success, ) = payable(msg.sender).call{value: responseValue}("");
        if (!success) revert CallFailed();
    }

    function stringToHex(
        string memory str
    ) internal pure returns (bytes memory) {
        // parse hex string to bytes
        bytes memory bytesArray = new bytes(bytes(str).length);

        for (uint256 i = 0; i < bytes(str).length; i++) {
            bytes1 b = bytes(str)[i];

            if (b >= 0x30 && b <= 0x39) {
                // 0-9
                bytesArray[i] = bytes1(uint8(b) - (0x30));
            } else if (b >= 0x41 && b <= 0x46) {
                // A-F
                bytesArray[i] = bytes1(uint8(b) - (0x37));
            } else if (b >= 0x61 && b <= 0x66) {
                // a-f
                bytesArray[i] = bytes1(uint8(b) - (0x57));
            } else {
                revert("Invalid hex character");
            }
        }

        return bytesArray;
    }

    function substring(
        string memory str,
        uint256 start,
        uint256 end
    ) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(end - start);
        for (uint256 i = start; i < end; i++) {
            result[i - start] = strBytes[i];
        }
        return string(result);
    }
}
