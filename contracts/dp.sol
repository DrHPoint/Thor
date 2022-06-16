//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "./interfaces/IDAI.sol";

contract DaiProxyLight is ERC2771Context {
    
    Dai private dai;

    constructor(address token, address trustedForwarder) ERC2771Context(trustedForwarder)  {
        dai = Dai(token);
    }

    function transfer(address receiver, uint256 amount, uint8 v, bytes32 r, bytes32 s) public {
        uint256 nonce = dai.nonces(_msgSender());
        // dai.permit(_msgSender(), address(this), nonce, now, true, v, r, s);
        dai.transferFrom(_msgSender(), receiver, amount);
    }
}