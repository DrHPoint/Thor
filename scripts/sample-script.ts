const hre = require("hardhat");
import { ethers, network, run, upgrades } from 'hardhat'
import { parseEther, parseUnits } from "ethers/lib/utils";

async function main() {
  
  const Thor = await ethers.getContractFactory("Undignified");
  const Thor2 = await ethers.getContractFactory("Dignified");
  
  const beacon = await upgrades.deployBeacon(Thor);
  await beacon.deployed();
  console.log("Beacon deployed to:", beacon.address);

  const thor = await upgrades.deployBeaconProxy(beacon, Thor, ["Odinson"]);
  await thor.deployed();
  console.log("Undignified deployed to:", thor.address);

  const firstAsk = await thor.askToOdin();
  console.log(firstAsk);

  await thor.setOld(345);
  const title1 = await thor.getOld();
  console.log(title1);
  
  const imp1 = await beacon.implementation();
  console.log(imp1);

  const thor2 = await upgrades.upgradeBeacon(beacon.address, Thor2);
  console.log("Beacon upgraded");

  const title2 = await thor.getOld();
  console.log(title2);
  
  const imp2 = await beacon.implementation();
  console.log(imp2);

  const odinSon = Thor2.attach(thor.address);
  console.log(0);

  await odinSon.trial();
  console.log(0);
  const secondAsk = await odinSon.askToOdin();
  console.log(secondAsk);

  const title = await odinSon.getTitle();
  console.log(title);
  // (await odinSon.askToOdin())

  // const gnosisSafe = '0xB568D3f92B695c1728c67BF89275F89dcC73114d';
  // console.log("Transferring ownership of ProxyAdmin...");
  // // The owner of the ProxyAdmin can upgrade our contracts
  // await upgrades.admin.transferProxyAdminOwnership(gnosisSafe);
  // console.log("Transferred ownership of ProxyAdmin to:", gnosisSafe);
  
  // const Liquidity = await ethers.getContractFactory("LiquidityProvider");
//   const liquidity = await Liquidity.deploy(
//       "0x45A168282825a50fACaA129A1Cda24D1E8142bC9",
//    "0x9C9E60d2AFFc8Bc588f96e28e0C82f6a19ae17F3",
//     parseUnits("1", 12),
//    parseUnits("1", 12), 
//    parseUnits("1", 12), 
//    parseUnits("1", 12), 
//    parseUnits("0.3", 18)); //97

  // await liquidity.deployed();

  //console.log("Nft deployed to:", nft.address);
  // console.log("liquidity deployed to:", liquidity.address);
// }


// console.log('starting verify vesting...')
// try {
//     await run('verify:verify', {
//         address: provider.address,
//         constructorArguments: [
//             "0x393be18b0dBC4568c3de4F61F51030130d5b7750",
//             "0x69668d1FE32805DaDde184B81F63c7931e9C3AF4",
//              parseUnits("1", 12),
//             parseUnits("1", 12), 
//             parseUnits("1", 12), 
//             parseUnits("1", 12), 
//             parseUnits("0.3", 18)
//         ],
//         contract: "contracts/LiquidityProvider.sol:LiquidityProvider"
//     });
// } catch (e: any) {
//     console.log(e.message)
// }
// console.log('verify success') 
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });