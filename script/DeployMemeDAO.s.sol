// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {MockERC20} from "../test/mocks/MockERC20.sol";
import {MemeDAO} from "../src/MemeDAO.sol";

contract DeployMemeDAO is Script {
    function run() public returns (address, address) {
        vm.startBroadcast();

        // Deploy MEMEGOD token with 1 billion initial supply
        MockERC20 token = new MockERC20(
            "MEMEGOD Token",
            "MEMEGOD",
            1e9 * 1e18 // 1 billion tokens with 18 decimals
        );

        // Deploy MemeDAO with MEMEGOD token
        MemeDAO dao = new MemeDAO(address(token));

        // Transfer all tokens to the DAO
        token.transfer(address(dao), token.balanceOf(msg.sender));

        vm.stopBroadcast();

        return (address(token), address(dao));
    }
}
