// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title IAI - Interface for AI System interactions
/// @notice This interface defines the standard methods for interacting with the AI system
interface IAI {
    /// @notice Chat with the AI system and receive a string response
    /// @param systemPrompt The system prompt to set the AI's context
    /// @param userMessage The user's message to the AI
    /// @return The AI's response as a string
    function chat(
        string calldata systemPrompt,
        string calldata userMessage
    ) external returns (string memory);

    /// @notice Chat with the AI system and receive a bytes response
    /// @param systemPrompt The system prompt to set the AI's context
    /// @param userMessage The user's message to the AI
    /// @return The AI's response as bytes
    function chat_bytes(
        string calldata systemPrompt,
        string calldata userMessage
    ) external returns (bytes memory);

    /// @notice Chat with the AI system and receive a boolean response
    /// @param systemPrompt The system prompt to set the AI's context
    /// @param userMessage The user's message to the AI
    /// @return The AI's response as a boolean
    function chat_bool(
        string calldata systemPrompt,
        string calldata userMessage
    ) external returns (bool);

    /// @notice Chat with the AI system and receive a uint256 response
    /// @param systemPrompt The system prompt to set the AI's context
    /// @param userMessage The user's message to the AI
    /// @return The AI's response as a uint256
    function chat_uint(
        string calldata systemPrompt,
        string calldata userMessage
    ) external returns (uint256);
}
