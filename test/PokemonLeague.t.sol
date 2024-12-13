// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {PokemonLeague} from "../src/PokemonLeague.sol";
import {MockAI} from "./MockAI.sol";

contract PokemonLeagueTest is Test {
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return this.onERC721Received.selector;
    }

    PokemonLeague public league;
    MockAI public mockAI;

    address public constant OWNER = address(0x1);
    address public constant PLAYER1 = address(0x70001);
    address public constant PLAYER2 = address(0x70002);

    event PokemonMinted(
        uint256 indexed tokenId,
        string name,
        string pokemonType
    );
    event BattleCompleted(
        uint256 indexed pokemon1Id,
        uint256 indexed pokemon2Id,
        uint256 winnerTokenId,
        string battleStory
    );
    event BattleRewardsDistributed(address indexed winner, uint256 amount);

    function setUp() public {
        vm.startPrank(OWNER);
        mockAI = new MockAI();

        // Deploy PokemonLeague
        league = new PokemonLeague();

        // Replace AI_SYSTEM address with our mock
        vm.etch(address(uint160(0xa1a1a1)), address(mockAI).code);
        vm.stopPrank();

        // Set mock AI response for Pokemon creation
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Charizard | Fire | A mighty fire dragon | Flame Thrower | 85"
        );

        // Fund players
        vm.deal(PLAYER1, 1 ether);
        vm.deal(PLAYER2, 1 ether);
    }

    function testInitialState() public {
        assertEq(league.owner(), OWNER);
        assertEq(league.name(), "AI Pokemon League");
        assertEq(league.symbol(), "AIPL");
    }

    function testMintPokemon() public {
        vm.expectEmit(true, false, false, true);
        emit PokemonMinted(0, "Charizard", "Fire");

        vm.startPrank(PLAYER1);
        uint256 tokenId = league.mint{value: league.MINT_PRICE()}();

        vm.stopPrank();

        assertEq(league.ownerOf(tokenId), PLAYER1);

        (
            string memory name,
            string memory pokemonType,
            string memory description,
            string memory ability,
            uint256 powerLevel
        ) = league.pokemons(tokenId);

        assertEq(name, "Charizard");
        assertEq(pokemonType, "Fire");
        assertEq(description, "A mighty fire dragon");
        assertEq(ability, "Flame Thrower");
        assertEq(powerLevel, 85);
    }

    function testFailInsufficientMintFee() public {
        vm.startPrank(PLAYER1);
        league.mint{value: league.MINT_PRICE() - 1}();
        vm.stopPrank();
    }

    function testPokemonBattle() public {
        // Set up two Pokemon
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Charizard | Fire | A mighty fire dragon | Flame Thrower | 85"
        );
        vm.startPrank(PLAYER1);
        uint256 pokemon1Id = league.mint{value: league.MINT_PRICE()}();
        vm.stopPrank();

        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Blastoise | Water | A powerful water turtle | Hydro Pump | 80"
        );
        vm.startPrank(PLAYER2);
        uint256 pokemon2Id = league.mint{value: league.MINT_PRICE()}();

        vm.stopPrank();

        // Set battle result
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Epic battle description...\nWINNER: Charizard"
        );

        uint256 player1InitialBalance = PLAYER1.balance;

        vm.startPrank(PLAYER1);
        league.battle{value: league.BATTLE_FEE()}(pokemon1Id, pokemon2Id);
        vm.stopPrank();

        // Check battle results
        assertGt(league.battleWins(pokemon1Id), 0);
        assertEq(league.battleWins(pokemon2Id), 0);

        // Check that winner received 90% of battle fee (10% house fee)
        uint256 battleFee = league.BATTLE_FEE();
        uint256 houseCut = (battleFee * league.HOUSE_FEE()) / 100;
        uint256 winnerReward = battleFee - houseCut;

        assertEq(
            PLAYER1.balance,
            player1InitialBalance - battleFee + winnerReward,
            "Winner should receive battle rewards minus house fee"
        );
    }

    function testFailSelfBattle() public {
        vm.startPrank(PLAYER1);
        uint256 tokenId = league.mint{value: league.MINT_PRICE()}();
        vm.stopPrank();

        vm.startPrank(PLAYER1);
        league.battle{value: league.BATTLE_FEE()}(tokenId, tokenId);
        vm.stopPrank();
    }

    function testFailInsufficientBattleFee() public {
        vm.startPrank(PLAYER1);
        uint256 pokemon1Id = league.mint{value: league.MINT_PRICE()}();
        vm.stopPrank();

        vm.startPrank(PLAYER2);
        uint256 pokemon2Id = league.mint{value: league.MINT_PRICE()}();
        vm.stopPrank();

        vm.startPrank(PLAYER1);
        league.battle{value: league.BATTLE_FEE() - 1}(pokemon1Id, pokemon2Id);
        vm.stopPrank();
    }

    function testFailBattleWithInvalidPokemon() public {
        vm.startPrank(PLAYER1);
        uint256 pokemon1Id = league.mint{value: league.MINT_PRICE()}();
        vm.stopPrank();

        vm.startPrank(PLAYER1);
        league.battle{value: league.BATTLE_FEE()}(pokemon1Id, 999);
        vm.stopPrank();
    }

    function testMultipleBattles() public {
        // Mint Pokemon for both players
        vm.startPrank(PLAYER1);
        uint256 pokemon1Id = league.mint{value: league.MINT_PRICE()}();
        vm.stopPrank();

        vm.startPrank(PLAYER2);
        uint256 pokemon2Id = league.mint{value: league.MINT_PRICE()}();
        vm.stopPrank();

        // First battle - Pokemon 1 wins
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Battle 1...\nWINNER: Charizard"
        );

        vm.startPrank(PLAYER1);
        league.battle{value: league.BATTLE_FEE()}(pokemon1Id, pokemon2Id);
        vm.stopPrank();

        // Second battle - Pokemon 2 wins
        MockAI(address(uint160(0xa1a1a1))).setResponse(
            "Battle 2...\nWINNER: Blastoise"
        );

        vm.prank(PLAYER2);
        league.battle{value: league.BATTLE_FEE()}(pokemon2Id, pokemon1Id);

        // Check battle records
        assertEq(league.battleWins(pokemon1Id), 1);
        assertEq(league.battleWins(pokemon2Id), 1);
    }

    function testReceiveFunction() public {
        // Send ETH directly to contract
        vm.deal(PLAYER1, 1 ether);
        vm.startPrank(PLAYER1);
        (bool success, ) = address(league).call{value: 0.5 ether}("");
        vm.stopPrank();
        assertTrue(success, "Contract should accept ETH");
    }

    receive() external payable {}
}
