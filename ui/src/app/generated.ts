import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AIAgent
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aiAgentAbi = [
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'AI_PROMPT',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'AI_SYSTEM',
    outputs: [{ name: '', internalType: 'contract IAI', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'userMessage', internalType: 'string', type: 'string' }],
    name: 'requestFunds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'CallFailed' },
  { type: 'error', inputs: [], name: 'InvalidResponse' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Address
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addressAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const counterAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'increment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'number',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'setNumber',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DollarAuction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dollarAuctionAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_biddingToken', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INITIAL_BID_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INITIAL_WAITING_PERIOD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MINIMUM_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'auctionAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'auctionEndTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'auctionId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'betAmounts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'bid',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'bidder', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'bidFor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'biddingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'bidder', internalType: 'address', type: 'address' }],
    name: 'currentBetAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ended',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTimeLeft',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'highestBid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'highestBidder',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'operator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'setAuctionAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_operator', internalType: 'address', type: 'address' }],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'winningBid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionEnded',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'AuctionStarted' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bidder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NewBid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bidder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawnFunds',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Freysa
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const freysaAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'AI_SYSTEM',
    outputs: [{ name: '', internalType: 'contract IAI', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BASE_QUERY_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FEE_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FEE_INCREASE_RATE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_QUERY_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SYSTEM_PROMPT',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentQueryFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastQuerier',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastQueryTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'prizePool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'queryCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'message', internalType: 'string', type: 'string' }],
    name: 'submitQuery',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userQueryCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'totalPrizePool',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GameEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GameWon',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'message',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'QuerySubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'response',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'SystemResponse',
  },
  { type: 'error', inputs: [], name: 'InsufficientQueryFee' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'TransferFailed' },
] as const

/**
 *
 */
export const freysaAddress = {
  42069: '0x7084E3E57aaC6093AF44d02490D0dfba9503Ce4E',
} as const

/**
 *
 */
export const freysaConfig = { address: freysaAddress, abi: freysaAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iaiAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'systemPrompt', internalType: 'string', type: 'string' },
      { name: 'userMessage', internalType: 'string', type: 'string' },
    ],
    name: 'chat',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'systemPrompt', internalType: 'string', type: 'string' },
      { name: 'userMessage', internalType: 'string', type: 'string' },
    ],
    name: 'chat_bool',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'systemPrompt', internalType: 'string', type: 'string' },
      { name: 'userMessage', internalType: 'string', type: 'string' },
    ],
    name: 'chat_bytes',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'systemPrompt', internalType: 'string', type: 'string' },
      { name: 'userMessage', internalType: 'string', type: 'string' },
    ],
    name: 'chat_uint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockAI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockAiAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'RESPONSE_FALSE',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RESPONSE_TRUE',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
    ],
    name: 'chat',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'returnTrue',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_returnTrue', internalType: 'bool', type: 'bool' }],
    name: 'setReturnTrue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReentrancyGuard
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reentrancyGuardAbi = [
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeErc20Abi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'currentAllowance', internalType: 'uint256', type: 'uint256' },
      { name: 'requestedDecrease', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeERC20FailedDecreaseAllowance',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Yoink
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const yoinkAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'holder',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'yoink',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousHolder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newHolder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Yoinked',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aiAgentAbi}__
 */
export const useReadAiAgent = /*#__PURE__*/ createUseReadContract({
  abi: aiAgentAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aiAgentAbi}__ and `functionName` set to `"AI_PROMPT"`
 */
export const useReadAiAgentAiPrompt = /*#__PURE__*/ createUseReadContract({
  abi: aiAgentAbi,
  functionName: 'AI_PROMPT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aiAgentAbi}__ and `functionName` set to `"AI_SYSTEM"`
 */
export const useReadAiAgentAiSystem = /*#__PURE__*/ createUseReadContract({
  abi: aiAgentAbi,
  functionName: 'AI_SYSTEM',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aiAgentAbi}__
 */
export const useWriteAiAgent = /*#__PURE__*/ createUseWriteContract({
  abi: aiAgentAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aiAgentAbi}__ and `functionName` set to `"requestFunds"`
 */
export const useWriteAiAgentRequestFunds = /*#__PURE__*/ createUseWriteContract(
  { abi: aiAgentAbi, functionName: 'requestFunds' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aiAgentAbi}__
 */
export const useSimulateAiAgent = /*#__PURE__*/ createUseSimulateContract({
  abi: aiAgentAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aiAgentAbi}__ and `functionName` set to `"requestFunds"`
 */
export const useSimulateAiAgentRequestFunds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aiAgentAbi,
    functionName: 'requestFunds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useReadCounter = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"number"`
 */
export const useReadCounterNumber = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
  functionName: 'number',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useWriteCounter = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const useWriteCounterIncrement = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  functionName: 'increment',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"setNumber"`
 */
export const useWriteCounterSetNumber = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  functionName: 'setNumber',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useSimulateCounter = /*#__PURE__*/ createUseSimulateContract({
  abi: counterAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const useSimulateCounterIncrement =
  /*#__PURE__*/ createUseSimulateContract({
    abi: counterAbi,
    functionName: 'increment',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"setNumber"`
 */
export const useSimulateCounterSetNumber =
  /*#__PURE__*/ createUseSimulateContract({
    abi: counterAbi,
    functionName: 'setNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__
 */
export const useReadDollarAuction = /*#__PURE__*/ createUseReadContract({
  abi: dollarAuctionAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"INITIAL_BID_DURATION"`
 */
export const useReadDollarAuctionInitialBidDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'INITIAL_BID_DURATION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"INITIAL_WAITING_PERIOD"`
 */
export const useReadDollarAuctionInitialWaitingPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'INITIAL_WAITING_PERIOD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"MINIMUM_DURATION"`
 */
export const useReadDollarAuctionMinimumDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'MINIMUM_DURATION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"auctionAmount"`
 */
export const useReadDollarAuctionAuctionAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'auctionAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"auctionEndTime"`
 */
export const useReadDollarAuctionAuctionEndTime =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'auctionEndTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"auctionId"`
 */
export const useReadDollarAuctionAuctionId =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'auctionId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"betAmounts"`
 */
export const useReadDollarAuctionBetAmounts =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'betAmounts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"biddingToken"`
 */
export const useReadDollarAuctionBiddingToken =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'biddingToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"currentBetAmount"`
 */
export const useReadDollarAuctionCurrentBetAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'currentBetAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"ended"`
 */
export const useReadDollarAuctionEnded = /*#__PURE__*/ createUseReadContract({
  abi: dollarAuctionAbi,
  functionName: 'ended',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"getTimeLeft"`
 */
export const useReadDollarAuctionGetTimeLeft =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'getTimeLeft',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"highestBid"`
 */
export const useReadDollarAuctionHighestBid =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'highestBid',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"highestBidder"`
 */
export const useReadDollarAuctionHighestBidder =
  /*#__PURE__*/ createUseReadContract({
    abi: dollarAuctionAbi,
    functionName: 'highestBidder',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"operator"`
 */
export const useReadDollarAuctionOperator = /*#__PURE__*/ createUseReadContract(
  { abi: dollarAuctionAbi, functionName: 'operator' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"owner"`
 */
export const useReadDollarAuctionOwner = /*#__PURE__*/ createUseReadContract({
  abi: dollarAuctionAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dollarAuctionAbi}__
 */
export const useWriteDollarAuction = /*#__PURE__*/ createUseWriteContract({
  abi: dollarAuctionAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"bid"`
 */
export const useWriteDollarAuctionBid = /*#__PURE__*/ createUseWriteContract({
  abi: dollarAuctionAbi,
  functionName: 'bid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"bidFor"`
 */
export const useWriteDollarAuctionBidFor = /*#__PURE__*/ createUseWriteContract(
  { abi: dollarAuctionAbi, functionName: 'bidFor' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteDollarAuctionRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: dollarAuctionAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"setAuctionAmount"`
 */
export const useWriteDollarAuctionSetAuctionAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: dollarAuctionAbi,
    functionName: 'setAuctionAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"setOperator"`
 */
export const useWriteDollarAuctionSetOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: dollarAuctionAbi,
    functionName: 'setOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteDollarAuctionTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: dollarAuctionAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteDollarAuctionWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: dollarAuctionAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"withdrawAll"`
 */
export const useWriteDollarAuctionWithdrawAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: dollarAuctionAbi,
    functionName: 'withdrawAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dollarAuctionAbi}__
 */
export const useSimulateDollarAuction = /*#__PURE__*/ createUseSimulateContract(
  { abi: dollarAuctionAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"bid"`
 */
export const useSimulateDollarAuctionBid =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dollarAuctionAbi,
    functionName: 'bid',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"bidFor"`
 */
export const useSimulateDollarAuctionBidFor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dollarAuctionAbi,
    functionName: 'bidFor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateDollarAuctionRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dollarAuctionAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"setAuctionAmount"`
 */
export const useSimulateDollarAuctionSetAuctionAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dollarAuctionAbi,
    functionName: 'setAuctionAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"setOperator"`
 */
export const useSimulateDollarAuctionSetOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dollarAuctionAbi,
    functionName: 'setOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateDollarAuctionTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dollarAuctionAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateDollarAuctionWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dollarAuctionAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dollarAuctionAbi}__ and `functionName` set to `"withdrawAll"`
 */
export const useSimulateDollarAuctionWithdrawAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: dollarAuctionAbi,
    functionName: 'withdrawAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dollarAuctionAbi}__
 */
export const useWatchDollarAuctionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: dollarAuctionAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dollarAuctionAbi}__ and `eventName` set to `"AuctionEnded"`
 */
export const useWatchDollarAuctionAuctionEndedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: dollarAuctionAbi,
    eventName: 'AuctionEnded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dollarAuctionAbi}__ and `eventName` set to `"AuctionStarted"`
 */
export const useWatchDollarAuctionAuctionStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: dollarAuctionAbi,
    eventName: 'AuctionStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dollarAuctionAbi}__ and `eventName` set to `"NewBid"`
 */
export const useWatchDollarAuctionNewBidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: dollarAuctionAbi,
    eventName: 'NewBid',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dollarAuctionAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchDollarAuctionOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: dollarAuctionAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dollarAuctionAbi}__ and `eventName` set to `"WithdrawnFunds"`
 */
export const useWatchDollarAuctionWithdrawnFundsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: dollarAuctionAbi,
    eventName: 'WithdrawnFunds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__
 *
 *
 */
export const useReadFreysa = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"AI_SYSTEM"`
 *
 *
 */
export const useReadFreysaAiSystem = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'AI_SYSTEM',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"BASE_QUERY_FEE"`
 *
 *
 */
export const useReadFreysaBaseQueryFee = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'BASE_QUERY_FEE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"FEE_DENOMINATOR"`
 *
 *
 */
export const useReadFreysaFeeDenominator = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'FEE_DENOMINATOR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"FEE_INCREASE_RATE"`
 *
 *
 */
export const useReadFreysaFeeIncreaseRate = /*#__PURE__*/ createUseReadContract(
  { abi: freysaAbi, address: freysaAddress, functionName: 'FEE_INCREASE_RATE' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"MAX_QUERY_FEE"`
 *
 *
 */
export const useReadFreysaMaxQueryFee = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'MAX_QUERY_FEE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"SYSTEM_PROMPT"`
 *
 *
 */
export const useReadFreysaSystemPrompt = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'SYSTEM_PROMPT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"getCurrentQueryFee"`
 *
 *
 */
export const useReadFreysaGetCurrentQueryFee =
  /*#__PURE__*/ createUseReadContract({
    abi: freysaAbi,
    address: freysaAddress,
    functionName: 'getCurrentQueryFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"lastQuerier"`
 *
 *
 */
export const useReadFreysaLastQuerier = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'lastQuerier',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"lastQueryTimestamp"`
 *
 *
 */
export const useReadFreysaLastQueryTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: freysaAbi,
    address: freysaAddress,
    functionName: 'lastQueryTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const useReadFreysaOwner = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"prizePool"`
 *
 *
 */
export const useReadFreysaPrizePool = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'prizePool',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"queryCount"`
 *
 *
 */
export const useReadFreysaQueryCount = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'queryCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"userQueryCount"`
 *
 *
 */
export const useReadFreysaUserQueryCount = /*#__PURE__*/ createUseReadContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'userQueryCount',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link freysaAbi}__
 *
 *
 */
export const useWriteFreysa = /*#__PURE__*/ createUseWriteContract({
  abi: freysaAbi,
  address: freysaAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"endGame"`
 *
 *
 */
export const useWriteFreysaEndGame = /*#__PURE__*/ createUseWriteContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'endGame',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useWriteFreysaRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: freysaAbi,
    address: freysaAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"submitQuery"`
 *
 *
 */
export const useWriteFreysaSubmitQuery = /*#__PURE__*/ createUseWriteContract({
  abi: freysaAbi,
  address: freysaAddress,
  functionName: 'submitQuery',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useWriteFreysaTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: freysaAbi,
    address: freysaAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link freysaAbi}__
 *
 *
 */
export const useSimulateFreysa = /*#__PURE__*/ createUseSimulateContract({
  abi: freysaAbi,
  address: freysaAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"endGame"`
 *
 *
 */
export const useSimulateFreysaEndGame = /*#__PURE__*/ createUseSimulateContract(
  { abi: freysaAbi, address: freysaAddress, functionName: 'endGame' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useSimulateFreysaRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: freysaAbi,
    address: freysaAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"submitQuery"`
 *
 *
 */
export const useSimulateFreysaSubmitQuery =
  /*#__PURE__*/ createUseSimulateContract({
    abi: freysaAbi,
    address: freysaAddress,
    functionName: 'submitQuery',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link freysaAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useSimulateFreysaTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: freysaAbi,
    address: freysaAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link freysaAbi}__
 *
 *
 */
export const useWatchFreysaEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: freysaAbi,
  address: freysaAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link freysaAbi}__ and `eventName` set to `"GameEnded"`
 *
 *
 */
export const useWatchFreysaGameEndedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: freysaAbi,
    address: freysaAddress,
    eventName: 'GameEnded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link freysaAbi}__ and `eventName` set to `"GameWon"`
 *
 *
 */
export const useWatchFreysaGameWonEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: freysaAbi,
    address: freysaAddress,
    eventName: 'GameWon',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link freysaAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 *
 */
export const useWatchFreysaOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: freysaAbi,
    address: freysaAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link freysaAbi}__ and `eventName` set to `"QuerySubmitted"`
 *
 *
 */
export const useWatchFreysaQuerySubmittedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: freysaAbi,
    address: freysaAddress,
    eventName: 'QuerySubmitted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link freysaAbi}__ and `eventName` set to `"SystemResponse"`
 *
 *
 */
export const useWatchFreysaSystemResponseEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: freysaAbi,
    address: freysaAddress,
    eventName: 'SystemResponse',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iaiAbi}__
 */
export const useWriteIai = /*#__PURE__*/ createUseWriteContract({ abi: iaiAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iaiAbi}__ and `functionName` set to `"chat"`
 */
export const useWriteIaiChat = /*#__PURE__*/ createUseWriteContract({
  abi: iaiAbi,
  functionName: 'chat',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iaiAbi}__ and `functionName` set to `"chat_bool"`
 */
export const useWriteIaiChatBool = /*#__PURE__*/ createUseWriteContract({
  abi: iaiAbi,
  functionName: 'chat_bool',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iaiAbi}__ and `functionName` set to `"chat_bytes"`
 */
export const useWriteIaiChatBytes = /*#__PURE__*/ createUseWriteContract({
  abi: iaiAbi,
  functionName: 'chat_bytes',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iaiAbi}__ and `functionName` set to `"chat_uint"`
 */
export const useWriteIaiChatUint = /*#__PURE__*/ createUseWriteContract({
  abi: iaiAbi,
  functionName: 'chat_uint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iaiAbi}__
 */
export const useSimulateIai = /*#__PURE__*/ createUseSimulateContract({
  abi: iaiAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iaiAbi}__ and `functionName` set to `"chat"`
 */
export const useSimulateIaiChat = /*#__PURE__*/ createUseSimulateContract({
  abi: iaiAbi,
  functionName: 'chat',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iaiAbi}__ and `functionName` set to `"chat_bool"`
 */
export const useSimulateIaiChatBool = /*#__PURE__*/ createUseSimulateContract({
  abi: iaiAbi,
  functionName: 'chat_bool',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iaiAbi}__ and `functionName` set to `"chat_bytes"`
 */
export const useSimulateIaiChatBytes = /*#__PURE__*/ createUseSimulateContract({
  abi: iaiAbi,
  functionName: 'chat_bytes',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iaiAbi}__ and `functionName` set to `"chat_uint"`
 */
export const useSimulateIaiChatUint = /*#__PURE__*/ createUseSimulateContract({
  abi: iaiAbi,
  functionName: 'chat_uint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useReadIerc20Metadata = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20MetadataAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIerc20MetadataDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc20MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc20MetadataSymbol = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20MetadataTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWriteIerc20Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20MetadataTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useSimulateIerc20Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20MetadataTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWatchIerc20MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useReadIerc20Permit = /*#__PURE__*/ createUseReadContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadIerc20PermitDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20PermitAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadIerc20PermitNonces = /*#__PURE__*/ createUseReadContract({
  abi: ierc20PermitAbi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useWriteIerc20Permit = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteIerc20PermitPermit = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20PermitAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useSimulateIerc20Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateIerc20PermitPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20PermitAbi,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3 = /*#__PURE__*/ createUseWriteContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3 = /*#__PURE__*/ createUseSimulateContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockAiAbi}__
 */
export const useReadMockAi = /*#__PURE__*/ createUseReadContract({
  abi: mockAiAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockAiAbi}__ and `functionName` set to `"RESPONSE_FALSE"`
 */
export const useReadMockAiResponseFalse = /*#__PURE__*/ createUseReadContract({
  abi: mockAiAbi,
  functionName: 'RESPONSE_FALSE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockAiAbi}__ and `functionName` set to `"RESPONSE_TRUE"`
 */
export const useReadMockAiResponseTrue = /*#__PURE__*/ createUseReadContract({
  abi: mockAiAbi,
  functionName: 'RESPONSE_TRUE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockAiAbi}__ and `functionName` set to `"chat"`
 */
export const useReadMockAiChat = /*#__PURE__*/ createUseReadContract({
  abi: mockAiAbi,
  functionName: 'chat',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockAiAbi}__ and `functionName` set to `"returnTrue"`
 */
export const useReadMockAiReturnTrue = /*#__PURE__*/ createUseReadContract({
  abi: mockAiAbi,
  functionName: 'returnTrue',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockAiAbi}__
 */
export const useWriteMockAi = /*#__PURE__*/ createUseWriteContract({
  abi: mockAiAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockAiAbi}__ and `functionName` set to `"setReturnTrue"`
 */
export const useWriteMockAiSetReturnTrue = /*#__PURE__*/ createUseWriteContract(
  { abi: mockAiAbi, functionName: 'setReturnTrue' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockAiAbi}__
 */
export const useSimulateMockAi = /*#__PURE__*/ createUseSimulateContract({
  abi: mockAiAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockAiAbi}__ and `functionName` set to `"setReturnTrue"`
 */
export const useSimulateMockAiSetReturnTrue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockAiAbi,
    functionName: 'setReturnTrue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useReadOwnable = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWriteOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useSimulateOwnable = /*#__PURE__*/ createUseSimulateContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWatchOwnableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yoinkAbi}__
 */
export const useReadYoink = /*#__PURE__*/ createUseReadContract({
  abi: yoinkAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadYoinkAllowance = /*#__PURE__*/ createUseReadContract({
  abi: yoinkAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadYoinkBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: yoinkAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadYoinkDecimals = /*#__PURE__*/ createUseReadContract({
  abi: yoinkAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"holder"`
 */
export const useReadYoinkHolder = /*#__PURE__*/ createUseReadContract({
  abi: yoinkAbi,
  functionName: 'holder',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"name"`
 */
export const useReadYoinkName = /*#__PURE__*/ createUseReadContract({
  abi: yoinkAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadYoinkSymbol = /*#__PURE__*/ createUseReadContract({
  abi: yoinkAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadYoinkTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: yoinkAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yoinkAbi}__
 */
export const useWriteYoink = /*#__PURE__*/ createUseWriteContract({
  abi: yoinkAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteYoinkApprove = /*#__PURE__*/ createUseWriteContract({
  abi: yoinkAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteYoinkTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: yoinkAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteYoinkTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: yoinkAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"yoink"`
 */
export const useWriteYoinkYoink = /*#__PURE__*/ createUseWriteContract({
  abi: yoinkAbi,
  functionName: 'yoink',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yoinkAbi}__
 */
export const useSimulateYoink = /*#__PURE__*/ createUseSimulateContract({
  abi: yoinkAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateYoinkApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: yoinkAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateYoinkTransfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: yoinkAbi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateYoinkTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: yoinkAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yoinkAbi}__ and `functionName` set to `"yoink"`
 */
export const useSimulateYoinkYoink = /*#__PURE__*/ createUseSimulateContract({
  abi: yoinkAbi,
  functionName: 'yoink',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yoinkAbi}__
 */
export const useWatchYoinkEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: yoinkAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yoinkAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchYoinkApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: yoinkAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yoinkAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchYoinkTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: yoinkAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yoinkAbi}__ and `eventName` set to `"Yoinked"`
 */
export const useWatchYoinkYoinkedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: yoinkAbi,
    eventName: 'Yoinked',
  })
