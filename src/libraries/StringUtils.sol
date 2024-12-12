// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library StringUtils {
    function getLastLine(
        string memory response
    ) internal pure returns (string memory) {
        bytes memory responseBytes = bytes(response);
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

        return string(lastLine);
    }

    function compareStrings(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function split(
        string memory _str,
        string memory _delim
    ) internal pure returns (string[] memory) {
        bytes memory str = bytes(_str);
        uint256 count = 1;
        for (uint256 i = 0; i < str.length; i++) {
            if (str[i] == bytes(_delim)[0]) count++;
        }

        string[] memory parts = new string[](count);
        uint256 partIndex = 0;
        uint256 startIndex = 0;

        for (uint256 i = 0; i < str.length; i++) {
            if (str[i] == bytes(_delim)[0]) {
                parts[partIndex++] = substring(_str, startIndex, i);
                startIndex = i + 1;
            }
        }
        parts[partIndex] = substring(_str, startIndex, str.length);
        return parts;
    }

    function trim(string memory str) internal pure returns (string memory) {
        bytes memory bstr = bytes(str);
        uint256 start = 0;
        uint256 end = bstr.length;

        while (start < end && bstr[start] == " ") start++;
        while (end > start && bstr[end - 1] == " ") end--;

        return substring(str, start, end);
    }

    function substring(
        string memory str,
        uint256 startIndex,
        uint256 endIndex
    ) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }

    function parseUint(string memory _str) internal pure returns (uint256) {
        bytes memory bstr = bytes(_str);
        uint256 result = 0;
        for (uint256 i = 0; i < bstr.length; i++) {
            require(bstr[i] >= "0" && bstr[i] <= "9", "Invalid number");
            result = result * 10 + uint8(bstr[i]) - 48;
        }
        return result;
    }

    function findSubstring(
        bytes memory str,
        bytes memory search
    ) internal pure returns (uint256) {
        if (str.length < search.length) return type(uint256).max;

        for (uint256 i = 0; i <= str.length - search.length; i++) {
            bool found = true;
            for (uint256 j = 0; j < search.length; j++) {
                if (str[i + j] != search[j]) {
                    found = false;
                    break;
                }
            }
            if (found) return i;
        }

        return type(uint256).max;
    }
}
