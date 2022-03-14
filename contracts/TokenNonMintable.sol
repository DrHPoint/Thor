// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DemiChain is ERC20, Ownable {

    address public childChainManagerProxy;
    
    constructor(address _childChainManagerProxy) ERC20("DemiChainNon", "DCN") {
        _mint(msg.sender, 1e18);
        childChainManagerProxy = _childChainManagerProxy;
    }

    function updateChildChainManager(address newChildChainManagerProxy) external onlyOwner{
        require(newChildChainManagerProxy != address(0), "Bad ChildChainManagerProxy address");

        childChainManagerProxy = newChildChainManagerProxy;
    }

    function deposit(address user, bytes calldata depositData) external {
        require(msg.sender == childChainManagerProxy, "You're not allowed to deposit");
        
        uint256 amount = abi.decode(depositData, (uint256));
        _mint(user, amount);
        
        emit Transfer(address(0), user, amount);
    }

    function withdraw(uint256 _amount) external {
        
        _burn(msg.sender, _amount);
        
        emit Transfer(msg.sender, address(0), _amount);
    }
}