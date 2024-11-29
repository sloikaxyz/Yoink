"use client";
export const FREYSA_ADDRESS = "0x750C3f90549774b4a0367cF9D583187b44D1C775";
export const FREYSA_ABI = [
  {
    inputs: [],
    name: "getCurrentQueryFee",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prizePool",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ type: "string", name: "_message" }],
    name: "submitQuery",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;
