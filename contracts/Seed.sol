pragma solidity ^0.4.17;


import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/Ownership/Ownable.sol';


contract Seed is ERC721Token, Ownable {

    /* 
     * @dev Token Standard Public Contants  
     */

    string public constant name = "Seed";
    string public constant symbol = "SD";
    
    /* 
     * @dev Permissions
     */
    enum Licensed { Authority, Producer, Distributer, Purchaser }
    mapping (address => Licensed) public roles;

    function Seed() {
        roles[msg.sender] = Licensed.Authority;
    }

    /* 
     * Modifiers
     */
    modifier authorityOnly() {
        require(roles[msg.sender] == Licensed.Authority);
        _;    
    }
}