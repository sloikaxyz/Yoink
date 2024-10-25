// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/DollarAuction.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {
        _mint(msg.sender, 1000000 * 1e6); // Mint 1 million USDC
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}

contract DollarAuctionTest is Test {
    DollarAuction public auction;
    MockUSDC public usdc;
    address public owner;
    address public bidder1;
    address public bidder2;
    address public bidder3;

    uint256 private INITIAL_BID_DURATION;

    function setUp() public {
        usdc = new MockUSDC();
        owner = address(1);
        bidder1 = address(2);
        bidder2 = address(3);
        bidder3 = address(4);

        usdc.transfer(bidder1, 10000 * 1e6);
        usdc.transfer(bidder2, 10000 * 1e6);
        usdc.transfer(bidder3, 10000 * 1e6);

        vm.startPrank(owner);
        auction = new DollarAuction(address(usdc));
        vm.stopPrank();

        INITIAL_BID_DURATION = auction.INITIAL_BID_DURATION();

        usdc.transfer(address(auction), 10 * 1e6);

        vm.prank(bidder1);
        usdc.approve(address(auction), type(uint256).max);
        vm.prank(bidder2);
        usdc.approve(address(auction), type(uint256).max);
        vm.prank(bidder3);
        usdc.approve(address(auction), type(uint256).max);
    }

    function testInitialState() public {
        assertEq(auction.owner(), owner, "Owner should be set");
        assertEq(auction.highestBid(), 0, "Highest bid should be 0");
        assertEq(
            auction.highestBidder(),
            address(0),
            "Highest bidder should be 0"
        );
        assertFalse(auction.ended(), "Auction should not have ended");
    }

    function testBidding() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        assertEq(
            auction.highestBidder(),
            bidder1,
            "Highest bidder should be bidder1"
        );
        assertEq(
            auction.highestBid(),
            100 * 1e6,
            "Highest bid should be 100e6"
        );

        vm.prank(bidder2);
        auction.bid(200 * 1e6);

        assertEq(auction.highestBidder(), bidder2);
        assertEq(auction.highestBid(), 200 * 1e6);
    }

    function testFailBidTooLow() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        vm.prank(bidder2);
        auction.bid(50 * 1e6);
    }

    function testWithdraw() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        // Wait for the auction to end
        vm.warp(
            block.timestamp + INITIAL_BID_DURATION + INITIAL_BID_DURATION + 1
        );

        uint256 initialBalance = usdc.balanceOf(bidder1);

        // Withdraw as highest bidder
        vm.prank(bidder1);
        auction.withdraw();

        assertEq(usdc.balanceOf(bidder1), initialBalance + 1e6); // AUCTION_AMOUNT is 1e6
    }

    function testAuctionExtension() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        uint256 firstEndTime = auction.auctionEndTime();
        assertEq(auction.currentExtensionDuration(), 150); // Full INITIAL_BID_DURATION

        vm.warp(block.timestamp + 2 minutes);
        vm.prank(bidder2);
        auction.bid(200 * 1e6);

        assertGt(auction.auctionEndTime(), firstEndTime);
        assertEq(auction.auctionEndTime(), firstEndTime + 150);
        assertEq(auction.currentExtensionDuration(), 75); // 300 /2 / 2
    }

    function testAutomaticEnd() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        vm.warp(block.timestamp + 5 minutes + 5 minutes);

        vm.prank(bidder2);
        vm.expectRevert("Auction has ended.");
        auction.bid(200 * 1e6);

        assertTrue(auction.ended());
        assertEq(auction.highestBidder(), bidder1);
        assertEq(auction.highestBid(), 100 * 1e6);
    }

    function testCheckAndEndAuction() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        vm.warp(
            block.timestamp + INITIAL_BID_DURATION + INITIAL_BID_DURATION + 1
        );

        assertTrue(auction.ended());

        vm.prank(owner);
        auction.withdrawAll();

        assertEq(
            usdc.balanceOf(address(auction)),
            0,
            "Auction balance should be 0"
        );
        assertEq(
            usdc.balanceOf(owner),
            11 * 10 * 1e6,
            "Owner should receive all funds"
        );
    }

    function testGetTimeLeft() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        uint256 firstEndTime = auction.auctionEndTime();
        assertEq(
            auction.getTimeLeft(),
            INITIAL_BID_DURATION + INITIAL_BID_DURATION,
            "Full INITIAL_BID_DURATION"
        );

        vm.warp(block.timestamp + 30 seconds);
        assertEq(auction.getTimeLeft(), firstEndTime - block.timestamp);

        vm.warp(firstEndTime);
        assertEq(auction.getTimeLeft(), 0);
    }

    // Add a new test for multiple bids from the same bidder
    function testMultipleBidsFromSameBidder() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        vm.prank(bidder1);
        auction.bid(150 * 1e6);

        assertEq(auction.highestBidder(), bidder1);
        assertEq(auction.highestBid(), 150 * 1e6);
        assertEq(auction.betAmounts(bidder1), 150 * 1e6);
    }

    // Add a new test for starting a new auction after withdrawal
    function testStartNewAuctionAfterWithdrawal() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        vm.warp(
            block.timestamp + INITIAL_BID_DURATION + INITIAL_BID_DURATION + 1
        );

        // Withdraw as highest bidder
        vm.prank(bidder1);
        auction.withdraw();

        assertEq(auction.auctionEndTime(), 0);
        assertEq(auction.highestBid(), 0);
        assertEq(auction.highestBidder(), address(0));
        assertEq(auction.currentExtensionDuration(), 0);

        vm.prank(bidder3);
        auction.bid(50 * 1e6);

        assertEq(auction.highestBidder(), bidder3);
        assertEq(auction.highestBid(), 50 * 1e6);
        assertTrue(auction.auctionEndTime() > 0);
        assertEq(auction.currentExtensionDuration(), INITIAL_BID_DURATION / 2);
    }

    function testBidWithUSDC() public {
        uint256 initialBalance = usdc.balanceOf(bidder1);

        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        assertEq(
            usdc.balanceOf(bidder1),
            initialBalance - 100 * 1e6,
            "USDC should be transferred from bidder"
        );
        assertEq(
            usdc.balanceOf(address(auction)),
            110 * 1e6, // Initial 10e6 + 100e6 bid
            "Auction contract should receive USDC"
        );
    }

    function testRefundPreviousBidder() public {
        uint256 bidder1InitialBalance = usdc.balanceOf(bidder1);
        uint256 bidder2InitialBalance = usdc.balanceOf(bidder2);

        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        vm.prank(bidder2);
        auction.bid(150 * 1e6);

        assertEq(
            usdc.balanceOf(bidder1),
            bidder1InitialBalance - 100 * 1e6,
            "Previous bidder's bid should be held"
        );
        assertEq(
            usdc.balanceOf(bidder2),
            bidder2InitialBalance - 150 * 1e6,
            "New bidder's balance should be reduced"
        );
    }

    function testFailInsufficientUSDCBalance() public {
        // Transfer all USDC away from bidder1
        vm.prank(bidder1);
        usdc.transfer(address(0), usdc.balanceOf(bidder1));

        vm.prank(bidder1);
        auction.bid(100 * 1e6);
    }

    function testOwnerWithdrawAll() public {
        uint256 initialOwnerBalance = usdc.balanceOf(owner);

        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        vm.warp(block.timestamp + 6 minutes);

        vm.prank(owner);
        auction.withdrawAll();

        assertEq(
            usdc.balanceOf(owner),
            initialOwnerBalance + 110 * 1e6, // Initial 10e6 + 100e6 bid
            "Owner should receive all USDC"
        );
        assertEq(
            usdc.balanceOf(address(auction)),
            0,
            "Auction contract should have 0 balance after withdrawal"
        );
    }

    function testFailNonOwnerWithdrawAll() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        vm.warp(block.timestamp + 6 minutes);

        vm.prank(bidder1);
        auction.withdrawAll();
    }

    function testBidderWithdrawAfterAuctionEnd() public {
        // Single bid from bidder1
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        // Wait for auction to end
        vm.warp(
            block.timestamp + INITIAL_BID_DURATION + INITIAL_BID_DURATION + 1
        );

        // Verify auction has ended
        assertTrue(auction.ended(), "Auction should be ended");

        uint256 initialBalance = usdc.balanceOf(bidder1);

        // Withdraw as highest bidder
        vm.prank(bidder1);
        auction.withdraw();

        assertEq(
            usdc.balanceOf(bidder1),
            initialBalance + 1e6,
            "Winner should receive AUCTION_AMOUNT"
        );
    }

    // Add new test to verify non-highest bidder cannot withdraw
    function testFailNonHighestBidderWithdraw() public {
        // First bid from bidder1
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        // Second bid from bidder2 (becomes highest bidder)
        vm.prank(bidder2);
        auction.bid(150 * 1e6);

        // Wait for auction to end
        vm.warp(block.timestamp + 6 minutes);

        // Attempt withdrawal as losing bidder (should fail)
        vm.prank(bidder1);
        auction.withdraw();
    }

    // Add this new test function after the existing tests
    function testBidExtensionHalving() public {
        // First bid - starts with full INITIAL_BID_DURATION (300 seconds)
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        uint256 firstEndTime = auction.auctionEndTime();
        assertEq(auction.currentExtensionDuration(), INITIAL_BID_DURATION / 2); // After first bid it halves
        assertEq(
            auction.auctionEndTime(),
            block.timestamp + INITIAL_BID_DURATION + INITIAL_BID_DURATION
        );

        vm.warp(block.timestamp + 30 seconds);
        vm.prank(bidder2);
        auction.bid(200 * 1e6);

        assertEq(
            auction.currentExtensionDuration(),
            INITIAL_BID_DURATION / 2 / 2
        ); // After second bid it halves again
        assertEq(
            auction.auctionEndTime(),
            firstEndTime + INITIAL_BID_DURATION / 2
        );

        uint256 secondEndTime = auction.auctionEndTime();
        vm.warp(block.timestamp + 15 seconds);
        vm.prank(bidder3);
        auction.bid(300 * 1e6);

        assertEq(
            auction.currentExtensionDuration(),
            INITIAL_BID_DURATION / 2 / 2 / 2
        );
        assertEq(
            auction.auctionEndTime(),
            secondEndTime + INITIAL_BID_DURATION / 2 / 2
        );

        uint256 thirdEndTime = auction.auctionEndTime();
        vm.warp(block.timestamp + 8 seconds);
        vm.prank(bidder1);
        auction.bid(400 * 1e6);

        assertEq(
            auction.currentExtensionDuration(),
            INITIAL_BID_DURATION / 2 / 2 / 2 / 2
        );
        assertEq(
            auction.auctionEndTime(),
            thirdEndTime + INITIAL_BID_DURATION / 2 / 2 / 2
        );

        uint256 fourthEndTime = auction.auctionEndTime();
        vm.warp(block.timestamp + 5 seconds);
        vm.prank(bidder2);
        auction.bid(500 * 1e6);

        assertEq(
            auction.currentExtensionDuration(),
            auction.MINIMUM_DURATION(),
            "Minimum duration should be reached"
        );
        assertEq(
            auction.auctionEndTime(),
            fourthEndTime + INITIAL_BID_DURATION / 2 / 2 / 2 / 2
        );
    }
}
