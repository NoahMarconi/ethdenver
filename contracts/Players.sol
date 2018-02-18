pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/Ownership/Ownable.sol';

contract Players is Ownable {

    /* 
     * @dev Roles TODO: add permissions (admin etc.)
     */
    enum Player { Transportation, Sourcing, Production, Finishing, Distribution }
    mapping (address => Player) public roles;

    /* 
     * Modifiers
     */
    modifier onlyTransportation() {
        require(roles[msg.sender] == Player.Transportation);
        _;    
    }

    modifier onlySourcing() {
        require(roles[msg.sender] == Player.Sourcing);
        _;    
    }

    modifier onlyProduction() {
        require(roles[msg.sender] == Player.Production);
        _;    
    }

    modifier onlyFinishing() {
        require(roles[msg.sender] == Player.Finishing);
        _;    
    }

    modifier onlyDistribution() {
        require(roles[msg.sender] == Player.Distribution);
        _;    
    }

    /* Setters */
    function setRole(address _player, uint256 _idx)
        public
        onlyOwner
    {
        roles[_player] = Player(_idx);
    }
}