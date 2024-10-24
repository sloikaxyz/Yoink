// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DollarAuction is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable biddingToken;
    uint256 public constant BID_DURATION = 5 minutes;
    uint256 public constant AUCTION_AMOUNT = 1e6;
    uint256 public auctionEndTime;
    uint256 public highestBid;
    address public highestBidder;

    mapping(address => uint256) public betAmounts;

    event NewBid(address indexed bidder, uint256 amount);
    event AuctionEnded(address indexed winner, uint256 winningBid);
    event WithdrawnFunds(address indexed bidder, uint256 amount);
    event AuctionStarted();

    constructor(address _biddingToken) Ownable(msg.sender) {
        biddingToken = IERC20(_biddingToken);
    }

    function bid(uint256 amount) public nonReentrant {
        require(amount > highestBid, "Bid not high enough");

        if (auctionEndTime == 0) {
            require(
                biddingToken.balanceOf(address(this)) >= AUCTION_AMOUNT,
                "Not enough USDC to start auction"
            );

            auctionEndTime = block.timestamp + BID_DURATION;

            emit AuctionStarted();
        } else if (block.timestamp >= auctionEndTime) {
            revert("Auction has ended.");
        }

        require(
            amount > betAmounts[msg.sender],
            "You have to bid more than your previous bid"
        );
        uint256 extraBid = amount - betAmounts[msg.sender];

        biddingToken.safeTransferFrom(msg.sender, address(this), extraBid);

        betAmounts[msg.sender] = amount;

        highestBidder = msg.sender;
        highestBid = amount;

        auctionEndTime = block.timestamp + BID_DURATION;

        emit NewBid(msg.sender, amount);
    }

    function withdraw() public nonReentrant {
        require(block.timestamp >= auctionEndTime, "Auction is not ended");
        require(msg.sender == highestBidder, "You are not the highest bidder");

        betAmounts[msg.sender] = 0;

        biddingToken.safeTransfer(msg.sender, AUCTION_AMOUNT);
        emit WithdrawnFunds(msg.sender, AUCTION_AMOUNT);

        auctionEndTime = 0; // allows to start a new auction
        // we don't reset the betAmounts, so the user can play again
        highestBid = 0;
        highestBidder = address(0);
    }

    function withdrawAll() public onlyOwner {
        biddingToken.safeTransfer(
            owner(),
            biddingToken.balanceOf(address(this))
        );
    }

    function getTimeLeft() public view returns (uint256) {
        if (auctionEndTime == 0) return 0;
        if (block.timestamp >= auctionEndTime) return 0;
        return auctionEndTime - block.timestamp;
    }

    function ended() public view returns (bool) {
        return auctionEndTime != 0 && block.timestamp >= auctionEndTime;
    }
}
