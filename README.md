# Yoink

Yoink is a unique ERC20 token contract deployed on Base Sepolia. It implements a "yoinkable" token concept where only one token exists, and it can be transferred between holders using the `yoink()` function.

## Contract Details

- **Name:** Yoink by Moai
- **Symbol:** YOINK
- **Total Supply:** 1 (non-divisible)
- **Decimals:** 0

## Features

- Only one token exists at any time
- The token can be "yoinked" (transferred) from the current holder to a new holder
- Implements standard ERC20 functions with modifications to suit the unique token concept
- Emits a `Yoinked` event when the token changes hands

## Deployment

The contract was deployed to Base Sepolia using the following command:

```bash
ff create src/Yoink.sol:Yoink --account deployer --rpc-url https://sepolia.base.org --verify --etherscan-api-key=$BASESCAN_API_KEY
```


# DollarAuction

DollarAuction is a unique ERC20 token contract deployed on Base Sepolia. It implements a "dollar auction" concept where the token can be minted by anyone by placing a bid higher than the current highest bid. The highest bidder wins the auction and receives the minted token.

## Deployment

```bash
source .env
export USDC_ADDRESS=0x8590E1601A5607b45f2934BDa7447dE6Cfe469b2
forge script script/DeployDollarAuction.s.sol:DeployDollarAuction --rpc-url base_sepolia --broadcast --verify --account deployer -vvvv --etherscan-api-key=$BASESCAN_API_KEY
```

Mint $SIMPLE:

```bash
export AUCTION=

cast send $USDC_ADDRESS -r base_sepolia "mint(address)()" $(cast wallet address --account deployer)  --account deployer

cast send $USDC_ADDRESS "transfer(address,uint256)()" $AUCTION 1ether -r base_sepolia --account deployer
 ```