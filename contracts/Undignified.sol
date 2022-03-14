//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Undignified is Initializable {

    uint256 old;
    string private title;
    bool private power;

    function initialize(string calldata _title) public initializer {
        title = _title;
    }

    function setOld(uint256 _old) external {
        old = _old;
    }
    
    function getOld() external view returns (uint256) {
        return old;
    }

    function getTitle() external view returns (string memory) {
        return title;
    }

    function getHello() external pure returns (string memory) {
        return "Hello";
    }

    function askToOdin() external view returns (string memory) {
        console.log("Are you worthy?");
        console.log("Hmmm...");
        console.log("Hmm..");
        console.log("Hm.");
        string memory decision;
        if (!power)
        {
            decision = "You are not worthy";
        }
        else
        {
            decision = "You are worthy";
        }
        return decision;
    }
}
