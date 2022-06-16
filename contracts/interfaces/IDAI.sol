//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

interface Dai{

    function transferFrom(address, address, uint) external returns (bool);

    function permit(address holder, address spender, uint256 nonce, uint256 expiry,
                    bool allowed, uint8 v, bytes32 r, bytes32 s) external;

    function nonces(address holder) external returns (uint256 nonce);
    
}