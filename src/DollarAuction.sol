// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

function max(uint256 a, uint256 b) pure returns (uint256) {
    return a > b ? a : b;
}

contract DollarAuction is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable biddingToken;
    uint256 public constant INITIAL_WAITING_PERIOD = 24 hours;
    uint256 public constant INITIAL_BID_DURATION = 5 minutes;
    uint256 public constant MINIMUM_DURATION = 30 seconds;

    uint256 public auctionAmount;
    uint256 public auctionEndTime;
    uint256 public highestBid;
    address public highestBidder;

    address public operator;

    mapping(uint256 => mapping(address => uint256)) public betAmounts;

    event NewBid(address indexed bidder, uint256 amount);
    event AuctionEnded(address indexed winner, uint256 winningBid);
    event WithdrawnFunds(address indexed bidder, uint256 amount);
    event AuctionStarted();

    uint256 public auctionId;

    constructor(address _biddingToken) Ownable(msg.sender) {
        biddingToken = IERC20(_biddingToken);
        // Set default auction amount to 1 unit of token
        auctionAmount = 10 ** IERC20Metadata(_biddingToken).decimals();

        operator = msg.sender;
    }

    modifier onlyOperator() {
        require(msg.sender == operator, "Only operator can call this function");
        _;
    }

    function setAuctionAmount(uint256 _newAmount) external onlyOwner {
        require(_newAmount > 0, "Amount must be greater than 0");
        auctionAmount = _newAmount;
    }

    function bid(uint256 amount) external nonReentrant {
        _processBid(msg.sender, amount);
    }

    function bidFor(address bidder, uint256 amount) external onlyOperator {
        _processBid(bidder, amount);
    }

    function _processBid(address bidder, uint256 amount) internal {
        if (auctionEndTime == 0) {
            require(
                biddingToken.balanceOf(address(this)) >= auctionAmount,
                "Not enough USDC to start auction"
            );

            auctionEndTime = block.timestamp + INITIAL_WAITING_PERIOD;
            emit AuctionStarted();
        } else if (block.timestamp >= auctionEndTime) {
            revert("Auction has ended.");
        }

        require(
            amount > highestBid,
            "Bid amount must be greater than current bid"
        );

        require(
            amount > betAmounts[auctionId][bidder],
            "You have to bid more than your previous bid"
        );
        uint256 extraBid = amount - betAmounts[auctionId][bidder];

        biddingToken.safeTransferFrom(bidder, address(this), extraBid);

        betAmounts[auctionId][bidder] = amount;

        if (
            highestBidder != address(0) &&
            auctionEndTime > block.timestamp + INITIAL_BID_DURATION
        ) {
            auctionEndTime = block.timestamp + INITIAL_BID_DURATION;
        }

        highestBidder = bidder;
        highestBid = amount;

        if (getTimeLeft() < 1 minutes) {
            auctionEndTime = block.timestamp + MINIMUM_DURATION;
        }

        emit NewBid(bidder, amount);
    }

    function withdraw() public nonReentrant {
        require(block.timestamp >= auctionEndTime, "Auction is not ended");
        require(highestBidder != address(0), "No bids yet");

        address winner = highestBidder;

        // This starts a new auction and invalidates all previous bids
        auctionId++;

        auctionEndTime = 0;
        highestBid = 0;
        highestBidder = address(0);

        // Transfer the auction amount to the highest bidder
        biddingToken.safeTransfer(winner, auctionAmount);
        emit WithdrawnFunds(winner, auctionAmount);
    }

    function withdrawAll() public onlyOwner {
        uint256 withdrawableAmount = biddingToken.balanceOf(address(this));

        // If there's an active auction, reserve the auction amount
        if (auctionEndTime != 0) {
            require(
                withdrawableAmount > auctionAmount,
                "Cannot withdraw auction amount during active auction"
            );
            withdrawableAmount -= auctionAmount;
        }

        biddingToken.safeTransfer(owner(), withdrawableAmount);
    }

    // returns the amount of tokens the bidder has bet on the current auction
    function currentBetAmount(address bidder) public view returns (uint256) {
        return betAmounts[auctionId][bidder];
    }

    function getTimeLeft() public view returns (uint256) {
        if (auctionEndTime == 0) return 0;
        if (block.timestamp >= auctionEndTime) return 0;
        return auctionEndTime - block.timestamp;
    }

    function ended() public view returns (bool) {
        return auctionEndTime != 0 && block.timestamp >= auctionEndTime;
    }

    function setOperator(address _operator) external onlyOwner {
        operator = _operator;
    }
}
