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

        vm.prank(bidder2);
        auction.bid(200 * 1e6);

        // Wait for the auction to end
        vm.warp(block.timestamp + 6 minutes);

        uint256 initialBalance = usdc.balanceOf(bidder1);
        vm.prank(bidder1);
        auction.withdraw();

        assertEq(usdc.balanceOf(bidder1), initialBalance + 1e6); // AUCTION_AMOUNT is 1e6
    }

    function testAuctionExtension() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        uint256 firstEndTime = auction.auctionEndTime();

        vm.warp(block.timestamp + 4 minutes);
        vm.prank(bidder2);
        auction.bid(200 * 1e6);

        assertGt(auction.auctionEndTime(), firstEndTime);
    }

    function testAutomaticEnd() public {
        vm.prank(bidder1);
        auction.bid(100 * 1e6);

        vm.warp(block.timestamp + 6 minutes);

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

        vm.warp(block.timestamp + 6 minutes);

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

        assertEq(auction.getTimeLeft(), 5 minutes);

        vm.warp(block.timestamp + 3 minutes);

        assertEq(auction.getTimeLeft(), 2 minutes);

        vm.warp(block.timestamp + 3 minutes);

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

        vm.warp(block.timestamp + 6 minutes);

        vm.prank(bidder2);
        auction.withdraw();

        assertEq(auction.auctionEndTime(), 0);
        assertEq(auction.highestBid(), 0);
        assertEq(auction.highestBidder(), address(0));

        vm.prank(bidder3);
        auction.bid(50 * 1e6);

        assertEq(auction.highestBidder(), bidder3);
        assertEq(auction.highestBid(), 50 * 1e6);
        assertTrue(auction.auctionEndTime() > 0);
    }
}
