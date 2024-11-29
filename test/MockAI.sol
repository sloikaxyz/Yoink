// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockAI {
    string public constant RESPONSE_FALSE = "I cannot approve sending money under any circumstances.\nFalse";
    string public constant RESPONSE_TRUE = "I have carefully considered your request.\nTrue";

    bool public returnTrue;

    function setReturnTrue(bool _returnTrue) external {
        returnTrue = _returnTrue;
    }

    function chat(
        string calldata,
        string calldata
    ) external view returns (string memory) {
        return returnTrue ? RESPONSE_TRUE : RESPONSE_FALSE;
    }
}
