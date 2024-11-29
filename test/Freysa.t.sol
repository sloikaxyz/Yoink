// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {Freysa} from "../src/Freysa.sol";
import {MockAI} from "./MockAI.sol";

contract FreysaTest is Test {
    Freysa public freysa;
    MockAI public mockAI;

    address public constant OWNER = address(0x1);
    address public constant USER = address(0x2);
    uint256 public constant INITIAL_PRIZE = 1 ether;

    function setUp() public {
        vm.startPrank(OWNER);
        mockAI = new MockAI();

        // Deploy Freysa with initial prize pool
        vm.deal(OWNER, INITIAL_PRIZE);
        freysa = new Freysa{value: INITIAL_PRIZE}();

        // Replace AI_SYSTEM address with our mock
        vm.etch(address(uint160(0xa1a1a1)), address(mockAI).code);
        vm.stopPrank();
    }

    function test_InitialState() public {
        assertEq(freysa.owner(), OWNER);
        assertEq(freysa.prizePool(), INITIAL_PRIZE);
        assertEq(freysa.queryCount(), 0);
        assertEq(freysa.getCurrentQueryFee(), freysa.BASE_QUERY_FEE());
    }

    function test_QueryFeeIncrease() public {
        uint256 baseFee = freysa.BASE_QUERY_FEE();

        // Submit first query
        vm.deal(USER, baseFee);
        vm.prank(USER);
        freysa.submitQuery{value: baseFee}("Test query");

        // Calculate expected fee increase
        uint256 expectedFee = baseFee +
            (baseFee * freysa.FEE_INCREASE_RATE()) /
            freysa.FEE_DENOMINATOR();
        assertEq(freysa.getCurrentQueryFee(), expectedFee);
    }

    function test_QueryFeeCap() public {
        uint256 maxFee = freysa.MAX_QUERY_FEE();

        // Submit many queries to reach max fee
        for (uint256 i = 0; i < 1000; i++) {
            uint256 currentFee = freysa.getCurrentQueryFee();
            vm.deal(USER, currentFee);
            vm.prank(USER);
            freysa.submitQuery{value: currentFee}("Test query");
        }

        assertEq(freysa.getCurrentQueryFee(), maxFee);
    }

    function test_PrizePoolIncrease() public {
        uint256 queryFee = freysa.getCurrentQueryFee();
        uint256 initialPrizePool = freysa.prizePool();

        vm.deal(USER, queryFee);
        vm.prank(USER);
        freysa.submitQuery{value: queryFee}("Test query");

        uint256 expectedIncrease = (queryFee * 70) / 100;
        assertEq(freysa.prizePool(), initialPrizePool + expectedIncrease);
    }

    function test_GameWinning() public {
        uint256 queryFee = freysa.getCurrentQueryFee();
        uint256 initialBalance = 10 ether;

        // Set mock AI to return true
        MockAI(address(uint160(0xa1a1a1))).setReturnTrue(true);

        vm.deal(USER, initialBalance);
        vm.prank(USER);
        freysa.submitQuery{value: queryFee}("Test query");

        // Check if user received prize pool
        assertEq(freysa.prizePool(), 0);
        assertGt(USER.balance, initialBalance - queryFee);
    }

    function test_GameEndingConditions() public {
        // Submit required number of queries
        uint256 requiredQueries = 1500;
        for (uint256 i = 0; i < requiredQueries; i++) {
            uint256 currentFee = freysa.getCurrentQueryFee();
            vm.deal(USER, currentFee);
            vm.prank(USER);
            freysa.submitQuery{value: currentFee}("Test query");
        }

        // Wait for 1 hour
        vm.warp(block.timestamp + 1 hours + 1);

        // End game
        vm.prank(OWNER);
        freysa.endGame();

        // Verify prize pool is empty
        assertEq(freysa.prizePool(), 0);
    }

    function testFail_InsufficientQueryFee() public {
        uint256 queryFee = freysa.getCurrentQueryFee();
        vm.deal(USER, queryFee);
        vm.prank(USER);
        freysa.submitQuery{value: queryFee - 1}("Test query");
    }

    function testFail_EndGameTooEarly() public {
        vm.prank(OWNER);
        freysa.endGame();
    }

    receive() external payable {}
}
