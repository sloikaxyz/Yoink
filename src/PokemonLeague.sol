// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "openzeppelin-contracts/token/ERC721/ERC721.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";
import {IAI} from "./interfaces/IAI.sol";
import {Strings} from "openzeppelin-contracts/utils/Strings.sol";
import {StringUtils} from "./libraries/StringUtils.sol";

contract PokemonLeague is ERC721, Ownable {
    using Strings for uint256;
    using StringUtils for string;

    string public constant MINT_PROMPT =
        "You are a Pokemon creator. Create a unique Pokemon with a name, type, and special abilities. "
        "Format the response as: [Name] | [Type] | [Description] | [Special Ability] | [Power Level 1-100]";

    string public constant BATTLE_PROMPT =
        "You are a Pokemon battle narrator. Create an exciting battle story between two Pokemon. "
        "Consider their types, abilities, and power levels. The stronger Pokemon has a higher chance of winning, "
        "but upsets are possible (20% chance if power difference < 20). "
        "End your response with WINNER: [Pokemon Name]";

    IAI public immutable AI_SYSTEM = IAI(address(uint160(0xa1a1a1)));

    uint256 public constant MINT_PRICE = 0.01 ether;
    uint256 public constant BATTLE_FEE = 0.005 ether;
    uint256 public constant HOUSE_FEE = 10; // 10%

    struct Pokemon {
        string name;
        string pokemonType;
        string description;
        string ability;
        uint256 powerLevel;
    }

    mapping(uint256 => Pokemon) public pokemons;
    mapping(uint256 => uint256) public battleWins;
    uint256 private _tokenIdCounter;

    event PokemonMinted(uint256 indexed tokenId, string name, string pokemonType);
    event BattleCompleted(
        uint256 indexed pokemon1Id,
        uint256 indexed pokemon2Id,
        uint256 winnerTokenId,
        string battleStory
    );
    event BattleRewardsDistributed(address indexed winner, uint256 amount);

    error InsufficientMintFee();
    error InsufficientBattleFee();
    error InvalidPokemon();
    error TransferFailed();
    error SelfBattle();

    constructor() ERC721("AI Pokemon League", "AIPL") Ownable(msg.sender) {}

    function mint() external payable returns (uint256) {
        if (msg.value < MINT_PRICE) revert InsufficientMintFee();

        string memory response = AI_SYSTEM.chat(MINT_PROMPT, "Create a new Pokemon");
        Pokemon memory newPokemon = parsePokemonResponse(response);

        uint256 tokenId = _tokenIdCounter++;
        _safeMint(msg.sender, tokenId);
        pokemons[tokenId] = newPokemon;

        emit PokemonMinted(tokenId, newPokemon.name, newPokemon.pokemonType);
        return tokenId;
    }

    function battle(uint256 pokemon1Id, uint256 pokemon2Id) external payable {
        if (msg.value < BATTLE_FEE) revert InsufficientBattleFee();
        if (pokemon1Id == pokemon2Id) revert SelfBattle();
        if (pokemon1Id >= _tokenIdCounter || pokemon2Id >= _tokenIdCounter) revert InvalidPokemon();

        Pokemon memory pokemon1 = pokemons[pokemon1Id];
        Pokemon memory pokemon2 = pokemons[pokemon2Id];

        // Construct battle prompt
        string memory battlePrompt = string.concat(
            BATTLE_PROMPT,
            "\n\nPokemon 1: ",
            pokemon1.name,
            " (", pokemon1.pokemonType, ") - ", pokemon1.ability,
            "\nPower Level: ", pokemon1.powerLevel.toString(),
            "\n\nPokemon 2: ",
            pokemon2.name,
            " (", pokemon2.pokemonType, ") - ", pokemon2.ability,
            "\nPower Level: ", pokemon2.powerLevel.toString()
        );

        string memory battleStory = AI_SYSTEM.chat(battlePrompt, "Begin battle");
        uint256 winnerTokenId = determineWinner(battleStory, pokemon1Id, pokemon2Id, pokemon1.name, pokemon2.name);
        
        battleWins[winnerTokenId]++;

        // Calculate and distribute rewards
        uint256 houseCut = (msg.value * HOUSE_FEE) / 100;
        uint256 winnerReward = msg.value - houseCut;
        
        address winner = ownerOf(winnerTokenId);
        (bool success, ) = payable(winner).call{value: winnerReward}("");
        if (!success) revert TransferFailed();

        emit BattleCompleted(pokemon1Id, pokemon2Id, winnerTokenId, battleStory);
        emit BattleRewardsDistributed(winner, winnerReward);
    }

    function parsePokemonResponse(string memory response) internal pure returns (Pokemon memory) {
        // Parse the response in format: Name | Type | Description | Ability | Power
        string[] memory parts = split(response, "|");
        require(parts.length == 5, "Invalid response format");

        return Pokemon({
            name: trim(parts[0]),
            pokemonType: trim(parts[1]),
            description: trim(parts[2]),
            ability: trim(parts[3]),
            powerLevel: parseUint(trim(parts[4]))
        });
    }

    function determineWinner(
        string memory battleStory,
        uint256 pokemon1Id,
        uint256 pokemon2Id,
        string memory pokemon1Name,
        string memory pokemon2Name
    ) internal pure returns (uint256) {
        bytes memory story = bytes(battleStory);
        bytes memory winner = bytes("WINNER: ");
        
        // Find "WINNER: " in the story
        uint256 winnerIndex = findSubstring(story, winner);
        require(winnerIndex != type(uint256).max, "No winner declared");

        // Extract winner name
        string memory winnerName = extractWinnerName(battleStory, winnerIndex + winner.length);
        
        // Compare with pokemon names to determine winner token ID
        if (compareStrings(winnerName, pokemon1Name)) {
            return pokemon1Id;
        } else if (compareStrings(winnerName, pokemon2Name)) {
            return pokemon2Id;
        } else {
            // If no match, default to pokemon1 (shouldn't happen with proper AI responses)
            return pokemon1Id;
        }
    }

    // Helper functions
    function split(string memory _str, string memory _delim) internal pure returns (string[] memory) {
        bytes memory str = bytes(_str);
        uint256 count = 1;
        for (uint256 i = 0; i < str.length; i++) {
            if (str[i] == bytes(_delim)[0]) count++;
        }

        string[] memory parts = new string[](count);
        uint256 partIndex = 0;
        uint256 startIndex = 0;

        for (uint256 i = 0; i < str.length; i++) {
            if (str[i] == bytes(_delim)[0]) {
                parts[partIndex++] = substring(_str, startIndex, i);
                startIndex = i + 1;
            }
        }
        parts[partIndex] = substring(_str, startIndex, str.length);
        return parts;
    }

    function trim(string memory str) internal pure returns (string memory) {
        bytes memory bstr = bytes(str);
        uint256 start = 0;
        uint256 end = bstr.length;

        while (start < end && bstr[start] == " ") start++;
        while (end > start && bstr[end - 1] == " ") end--;

        return substring(str, start, end);
    }

    function substring(string memory str, uint256 startIndex, uint256 endIndex) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }

    function parseUint(string memory _str) internal pure returns (uint256) {
        bytes memory bstr = bytes(_str);
        uint256 result = 0;
        for (uint256 i = 0; i < bstr.length; i++) {
            require(bstr[i] >= "0" && bstr[i] <= "9", "Invalid number");
            result = result * 10 + uint8(bstr[i]) - 48;
        }
        return result;
    }

    function findSubstring(bytes memory str, bytes memory search) internal pure returns (uint256) {
        if (str.length < search.length) return type(uint256).max;

        for (uint256 i = 0; i <= str.length - search.length; i++) {
            bool found = true;
            for (uint256 j = 0; j < search.length; j++) {
                if (str[i + j] != search[j]) {
                    found = false;
                    break;
                }
            }
            if (found) return i;
        }

        return type(uint256).max;
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function extractWinnerName(string memory str, uint256 startIndex) internal pure returns (string memory) {
        bytes memory bstr = bytes(str);
        uint256 endIndex = startIndex;
        while (endIndex < bstr.length && bstr[endIndex] != "\n") endIndex++;
        return substring(str, startIndex, endIndex);
    }

    receive() external payable {}
}
