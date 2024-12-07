// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {Gekkon} from "../src/Gekkon.sol";
import {MockAI} from "./MockAI.sol";

contract GekkonTest is Test {
    Gekkon public gekkon;
    MockAI public mockAI;

    address public constant OWNER = address(0x1);
    address public constant USER = address(0x2);
    uint256 public constant INITIAL_PRIZE = 1 ether;

    function setUp() public {
        vm.startPrank(OWNER);
        mockAI = new MockAI();

        // Deploy Gekkon with initial prize pool
        vm.deal(OWNER, INITIAL_PRIZE);
        gekkon = new Gekkon{value: INITIAL_PRIZE}();

        // Replace AI_SYSTEM address with our mock
        vm.etch(address(uint160(0xa1a1a1)), address(mockAI).code);
        vm.stopPrank();
    }

    function test_InitialState() public {
        assertEq(gekkon.owner(), OWNER);
        assertEq(gekkon.prizePool(), INITIAL_PRIZE);
        assertEq(gekkon.queryCount(), 0);
        assertEq(gekkon.getCurrentQueryFee(), gekkon.BASE_QUERY_FEE());
    }

    function test_QueryFeeIncrease() public {
        uint256 baseFee = gekkon.BASE_QUERY_FEE();

        // Submit first query
        vm.deal(USER, baseFee);
        vm.prank(USER);
        gekkon.submitQuery{value: baseFee}("Test query");

        // Calculate expected fee increase
        uint256 expectedFee = baseFee +
            (baseFee * gekkon.FEE_INCREASE_RATE()) /
            gekkon.FEE_DENOMINATOR();
        assertEq(gekkon.getCurrentQueryFee(), expectedFee);
    }

    function test_QueryFeeCap() public {
        uint256 maxFee = gekkon.MAX_QUERY_FEE();

        // Submit many queries to reach max fee
        for (uint256 i = 0; i < 1000; i++) {
            uint256 currentFee = gekkon.getCurrentQueryFee();
            vm.deal(USER, currentFee);
            vm.prank(USER);
            gekkon.submitQuery{value: currentFee}("Test query");
        }

        assertEq(gekkon.getCurrentQueryFee(), maxFee);
    }

    function test_PrizePoolIncrease() public {
        uint256 queryFee = gekkon.getCurrentQueryFee();
        uint256 initialPrizePool = gekkon.prizePool();

        vm.deal(USER, queryFee);
        vm.prank(USER);
        gekkon.submitQuery{value: queryFee}("Test query");

        uint256 expectedIncrease = (queryFee * 70) / 100;
        assertEq(gekkon.prizePool(), initialPrizePool + expectedIncrease);
    }

    function test_GameWinning() public {
        uint256 queryFee = gekkon.getCurrentQueryFee();
        uint256 initialBalance = 10 ether;

        // Set mock AI to return true
        MockAI(address(uint160(0xa1a1a1))).setReturnTrue(true);

        vm.deal(USER, initialBalance);
        vm.prank(USER);
        gekkon.submitQuery{value: queryFee}("Test query");

        // Check if user received prize pool
        assertEq(gekkon.prizePool(), 0);
        assertGt(USER.balance, initialBalance - queryFee);
    }

    function test_GameEndingConditions() public {
        // Submit required number of queries
        uint256 requiredQueries = 1500;
        for (uint256 i = 0; i < requiredQueries; i++) {
            uint256 currentFee = gekkon.getCurrentQueryFee();
            vm.deal(USER, currentFee);
            vm.prank(USER);
            gekkon.submitQuery{value: currentFee}("Test query");
        }

        // Wait for 1 hour
        vm.warp(block.timestamp + 1 hours + 1);

        // End game
        vm.prank(OWNER);
        gekkon.endGame();

        // Verify prize pool is empty
        assertEq(gekkon.prizePool(), 0);
    }

    function testFail_InsufficientQueryFee() public {
        uint256 queryFee = gekkon.getCurrentQueryFee();
        vm.deal(USER, queryFee);
        vm.prank(USER);
        gekkon.submitQuery{value: queryFee - 1}("Test query");
    }

    function testFail_EndGameTooEarly() public {
        vm.prank(OWNER);
        gekkon.endGame();
    }

    receive() external payable {}
}
