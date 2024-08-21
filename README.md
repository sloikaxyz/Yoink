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
