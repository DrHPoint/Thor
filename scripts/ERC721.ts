const hre = require("hardhat");
import { ethers, network, run, upgrades } from 'hardhat'
import { parseEther, parseUnits } from "ethers/lib/utils";

function sleep() {
  return new Promise(
    resolve => setTimeout(resolve, 20000)
  );
}

async function main() {
  
  await sleep();
  
  const ERC20 = await ethers.getContractFactory("DemiChain");
  
  const erc20 = await ERC20.deploy("0xb5505a6d998549090530911180f38aC5130101c6");
  await erc20.deployed();
  console.log("Demichain deployed to:", erc20.address);
  
  console.log('starting verify vesting...');

  await sleep();

  try {
    await run('verify:verify', {
        address: erc20.address,
        constructorArguments: [
            "0xb5505a6d998549090530911180f38aC5130101c6"
        ],
        contract: "contracts/TokenM.sol:DemiChain"
    });
  } catch (e: any) {
        console.log(e.message)
  }
    console.log('verify success') 
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });