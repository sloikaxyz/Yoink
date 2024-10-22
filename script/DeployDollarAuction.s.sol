// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {DollarAuction} from "../src/DollarAuction.sol";

contract DeployDollarAuction is Script {
    function run() external {
        address usdcAddress = vm.envAddress("USDC_ADDRESS");

        vm.startBroadcast();

        DollarAuction auction = new DollarAuction(usdcAddress);

        console.log("DollarAuction deployed at:", address(auction));

        vm.stopBroadcast();
    }
}
