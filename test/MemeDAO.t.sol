// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {MemeDAO} from "../src/MemeDAO.sol";
import {MockAI} from "./MockAI.sol";
import {MockERC20} from "./mocks/MockERC20.sol";

contract MemeDAOTest is Test {
    MemeDAO public dao;
    MockERC20 public daoToken;
    MockAI public mockAI;

    address public constant OWNER = address(0x1);
    address public constant PITCHER = address(0x2);
    address public constant TOKEN_ADDRESS = address(0x1234);

    uint256 public constant INITIAL_DAO_TOKENS = 1000000 * 1e18;
    uint256 public constant PITCH_FEE = 0.01 ether;
    uint256 public constant INVESTMENT_AMOUNT = 0.1 ether;

    event PitchSubmitted(
        address indexed pitcher,
        address indexed token,
        string pitch
    );
    event InvestmentMade(address indexed token, uint256 amount);
    event TokensDistributed(address indexed pitcher, uint256 amount);

    function setUp() public {
        vm.startPrank(OWNER);

        // Deploy mock DAO token
        daoToken = new MockERC20("DAO Token", "DAO", INITIAL_DAO_TOKENS);

        // Deploy DAO
        dao = new MemeDAO(address(daoToken));

        // Deploy mock AI and replace AI_SYSTEM address
        mockAI = new MockAI();
        vm.etch(address(uint160(0xa1a1a1)), address(mockAI).code);

        // Transfer DAO tokens to DAO contract
        daoToken.transfer(address(dao), INITIAL_DAO_TOKENS);

        vm.stopPrank();

        // Investment fund
        vm.deal(address(dao), 10 ether);

        // Give PITCHER some ETH for fees
        vm.deal(PITCHER, 1 ether);
    }

    function testInitialState() public {
        assertEq(dao.owner(), OWNER);
        assertEq(daoToken.balanceOf(address(dao)), INITIAL_DAO_TOKENS);
    }

    function testPitchTokenWithInvestmentDecision() public {
        // Set AI to return INVEST
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Detailed analysis\nINVEST"
        );

        uint256 initialPitcherBalance = daoToken.balanceOf(PITCHER);

        // Fund the token address for testing
        vm.deal(TOKEN_ADDRESS, 1 ether);

        vm.expectEmit(true, true, false, true);
        emit PitchSubmitted(PITCHER, TOKEN_ADDRESS, "Test pitch");

        vm.expectEmit(true, false, false, true);
        emit InvestmentMade(TOKEN_ADDRESS, INVESTMENT_AMOUNT);

        vm.expectEmit(true, false, false, false);
        emit TokensDistributed(PITCHER, INITIAL_DAO_TOKENS / 100);

        vm.prank(PITCHER);
        dao.pitchToken{value: PITCH_FEE}(TOKEN_ADDRESS, "Test pitch");

        // Check DAO tokens were distributed (1% for successful pitch)
        uint256 expectedReward = INITIAL_DAO_TOKENS / 100;
        assertEq(
            daoToken.balanceOf(PITCHER),
            initialPitcherBalance + expectedReward,
            "Pitcher should receive 1% of DAO tokens"
        );
    }

    function testPitchTokenWithoutInvestment() public {
        // Set AI to return PASS
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Detailed analysis\nPASS"
        );

        uint256 initialPitcherBalance = daoToken.balanceOf(PITCHER);

        vm.prank(PITCHER);
        dao.pitchToken{value: PITCH_FEE}(TOKEN_ADDRESS, "Test pitch");

        // Check consolation DAO tokens were distributed (0.1%)
        uint256 expectedReward = INITIAL_DAO_TOKENS / 1000;
        assertEq(
            daoToken.balanceOf(PITCHER),
            initialPitcherBalance + expectedReward,
            "Pitcher should receive 0.1% of DAO tokens as consolation"
        );
    }

    function testFailInsufficientPitchFee() public {
        vm.prank(PITCHER);
        dao.pitchToken{value: PITCH_FEE - 1}(TOKEN_ADDRESS, "Test pitch");
    }

    function testFailInvalidTokenAddress() public {
        vm.prank(PITCHER);
        dao.pitchToken{value: PITCH_FEE}(address(0), "Test pitch");
    }

    function testReceiveFunction() public {
        // Send ETH directly to contract
        vm.deal(PITCHER, 1 ether);
        vm.prank(PITCHER);
        (bool success, ) = address(dao).call{value: 0.5 ether}("");
        assertTrue(success, "Contract should accept ETH");
    }

    function testMultiplePitches() public {
        uint256 initialPitcherBalance = daoToken.balanceOf(PITCHER);

        // Fund the token address for testing
        vm.deal(TOKEN_ADDRESS, 1 ether);

        // First pitch - INVEST
        MockAI(address(uint160(0xa1a1a1))).setResponse("Analysis 1\nINVEST");
        vm.prank(PITCHER);
        dao.pitchToken{value: PITCH_FEE}(TOKEN_ADDRESS, "Pitch 1");

        // Second pitch - PASS
        MockAI(address(uint160(0xa1a1a1))).setResponse("Analysis 2\nPASS");
        vm.prank(PITCHER);
        dao.pitchToken{value: PITCH_FEE}(address(daoToken), "Pitch 2");

        // Calculate rewards:
        // First pitch (INVEST) - 1% of initial tokens
        // Second pitch (PASS) - 0.1% of remaining tokens after first pitch
        uint256 firstReward = INITIAL_DAO_TOKENS / 100; // 1%
        uint256 remainingTokens = INITIAL_DAO_TOKENS - firstReward;
        uint256 secondReward = remainingTokens / 1000; // 0.1% of remaining
        uint256 expectedReward = firstReward + secondReward;

        assertEq(
            daoToken.balanceOf(PITCHER),
            initialPitcherBalance + expectedReward,
            "Pitcher should receive correct combined rewards"
        );
    }
}
