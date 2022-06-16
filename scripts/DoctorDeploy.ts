const hre = require("hardhat");
import config from '../config'
import { network, run } from 'hardhat'
import { parseEther, parseUnits } from "ethers/lib/utils";

function sleep() {
    return new Promise(
        resolve => setTimeout(resolve, 20000)
    );
}

async function main() {
  
    const { TRUSTED_ADDRESS } = config[network.name]
    const Contract = await hre.ethers.getContractFactory("DoctorTheme");
    const contract = await Contract.deploy(TRUSTED_ADDRESS);
    await contract.deployed();
    console.log("DoctorTheme deployed to:", contract.address);

    await sleep();

    console.log('DoctorTheme verify vesting...');


    try {
        await run('verify:verify', {
            address: contract.address,
            constructorArguments: [
                TRUSTED_ADDRESS
                ],
                contract: "contracts/biconomyGo.sol:DoctorTheme"
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