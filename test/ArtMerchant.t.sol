// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {ArtMerchant} from "../src/ArtMerchant.sol";
import {MockAI} from "./MockAI.sol";

contract ArtMerchantTest is Test {
    ArtMerchant public merchant;
    MockAI public mockAI;

    address public constant OWNER = address(0x1);
    address public constant BUYER = address(0x2);
    uint256 public constant ASKING_PRICE = 1 ether;

    event ArtPieceCreated(uint256 indexed tokenId, string description, uint256 askingPrice);
    event HaggleAttempt(uint256 indexed tokenId, address indexed buyer, string haggle, bool success);
    event ArtPieceSold(uint256 indexed tokenId, address indexed buyer, uint256 finalPrice);

    function setUp() public {
        vm.startPrank(OWNER);
        mockAI = new MockAI();

        // Deploy ArtMerchant
        merchant = new ArtMerchant();

        // Replace AI_SYSTEM address with our mock
        vm.etch(address(uint160(0xa1a1a1)), address(mockAI).code);
        vm.stopPrank();

        // Set mock AI response for art description
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "A stunning digital masterpiece in vibrant colors"
        );
    }

    function testInitialState() public {
        assertEq(merchant.owner(), OWNER);
        assertEq(merchant.name(), "AI Art Merchant");
        assertEq(merchant.symbol(), "AIAM");
    }

    function testCreateArtPiece() public {
        vm.expectEmit(true, false, false, true);
        emit ArtPieceCreated(0, "A stunning digital masterpiece in vibrant colors", ASKING_PRICE);

        vm.prank(OWNER);
        merchant.createArtPiece(ASKING_PRICE);

        (string memory description, uint256 price, bool sold) = merchant.artPieces(0);
        assertEq(description, "A stunning digital masterpiece in vibrant colors");
        assertEq(price, ASKING_PRICE);
        assertFalse(sold);
    }

    function testSuccessfulHaggle() public {
        // Create art piece
        vm.prank(OWNER);
        merchant.createArtPiece(ASKING_PRICE);

        // Set mock AI to accept the deal
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Interesting negotiation...\nDEAL"
        );

        // Fund buyer
        vm.deal(BUYER, ASKING_PRICE);

        vm.expectEmit(true, true, false, true);
        emit HaggleAttempt(0, BUYER, "I offer full price", true);

        vm.expectEmit(true, true, false, true);
        emit ArtPieceSold(0, BUYER, ASKING_PRICE);

        // Attempt to buy
        vm.prank(BUYER);
        merchant.buy{value: ASKING_PRICE}(0, "I offer full price");

        // Verify ownership
        assertEq(merchant.ownerOf(0), BUYER);
        (,, bool sold) = merchant.artPieces(0);
        assertTrue(sold);
    }

    function testFailedHaggle() public {
        // Create art piece
        vm.prank(OWNER);
        merchant.createArtPiece(ASKING_PRICE);

        // Set mock AI to reject the deal
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Not convinced...\nNO DEAL"
        );

        // Fund buyer
        vm.deal(BUYER, ASKING_PRICE);

        uint256 initialBalance = BUYER.balance;

        vm.expectEmit(true, true, false, true);
        emit HaggleAttempt(0, BUYER, "Half price?", false);

        // Attempt to buy
        vm.prank(BUYER);
        merchant.buy{value: ASKING_PRICE}(0, "Half price?");

        // Verify refund and no ownership change
        assertEq(BUYER.balance, initialBalance, "Buyer should be refunded");
        assertEq(merchant.ownerOf(0), address(0), "Token should not be minted");
    }

    function testFailBuyNonexistentArt() public {
        vm.deal(BUYER, ASKING_PRICE);
        vm.prank(BUYER);
        vm.expectRevert("InvalidArtPiece");
        merchant.buy{value: ASKING_PRICE}(0, "I want to buy this");
    }

    function testFailBuyWithInsufficientPayment() public {
        // Create art piece
        vm.prank(OWNER);
        merchant.createArtPiece(ASKING_PRICE);

        vm.deal(BUYER, ASKING_PRICE / 2);
        vm.prank(BUYER);
        vm.expectRevert("InsufficientPayment");
        merchant.buy{value: ASKING_PRICE / 2}(0, "Half price offer");
    }

    function testFailBuyAlreadySoldArt() public {
        // Create and sell art piece
        vm.prank(OWNER);
        merchant.createArtPiece(ASKING_PRICE);

        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Good offer!\nDEAL"
        );

        vm.deal(BUYER, ASKING_PRICE);
        vm.prank(BUYER);
        merchant.buy{value: ASKING_PRICE}(0, "Full price");

        // Try to buy again
        address secondBuyer = address(0x3);
        vm.deal(secondBuyer, ASKING_PRICE);
        vm.prank(secondBuyer);
        vm.expectRevert("AlreadySold");
        merchant.buy{value: ASKING_PRICE}(0, "I want to buy this");
    }

    function testOwnerWithdraw() public {
        // Create and sell art piece
        vm.prank(OWNER);
        merchant.createArtPiece(ASKING_PRICE);

        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Excellent offer!\nDEAL"
        );

        vm.deal(BUYER, ASKING_PRICE);
        vm.prank(BUYER);
        merchant.buy{value: ASKING_PRICE}(0, "Full price");

        uint256 initialBalance = OWNER.balance;
        
        vm.prank(OWNER);
        merchant.withdraw();

        assertEq(OWNER.balance, initialBalance + ASKING_PRICE, "Owner should receive payment");
        assertEq(address(merchant).balance, 0, "Contract should have 0 balance");
    }

    function testFailNonOwnerWithdraw() public {
        vm.prank(BUYER);
        vm.expectRevert("Ownable: caller is not the owner");
        merchant.withdraw();
    }

    receive() external payable {}
}
