// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockAI {
    string public response;
    bool public returnTrue;

    function setResponse(string memory _response) external {
        response = _response;
    }

    function setReturnTrue(bool _returnTrue) external {
        returnTrue = _returnTrue;
    }

    function chat(
        string calldata,
        string calldata
    ) external view returns (string memory) {
        if (returnTrue) {
            return "Analysis\nTrue";
        }
        return response;
    }
}
