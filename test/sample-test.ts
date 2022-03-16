import { expect } from "chai";
import { Contract, ContractFactory, Signer, utils } from "ethers";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { ethers, network, upgrades } from "hardhat";
import { hexConcat } from "@ethersproject/bytes";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

let Thor : ContractFactory;
let thor : Contract;
let Thor2 : ContractFactory;
// let thor2 : Contract;
let Access : ContractFactory;
let access : Contract;
let owner: SignerWithAddress;
let boss1: SignerWithAddress;
let boss2: SignerWithAddress;
let boss3: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;
let addr3: SignerWithAddress;
let addr4: SignerWithAddress;

describe("Upgrade", function () {

  beforeEach(async () => {
    Thor = await ethers.getContractFactory("Undignified");
    Thor2 = await ethers.getContractFactory("Dignified");
  });

  describe("Proxy", () => {

    it("Deploy & Upgrade", async () => {
      
      thor = await upgrades.deployProxy(Thor, ["Odinson"]);

      const firstAsk = await thor.askToOdin();
      console.log(firstAsk);

      await thor.setOld(345);
      
      const title1 = await thor.getOld();
      console.log(title1);

      const thor2 = await upgrades.upgradeProxy(thor.address, Thor2);
      console.log("Proxy upgraded");

      const title2 = await thor.getOld();
      console.log(title2);

      const odinSon = Thor2.attach(thor.address);

      await odinSon.trial();

      const secondAsk = await odinSon.askToOdin();
      console.log(secondAsk);

      const title = await odinSon.getTitle();
      console.log(title);
    });

  });

  describe("Beacon proxy", () => {

    it("Deploy & Upgrade", async () => {

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

      await odinSon.trial();

      const secondAsk = await odinSon.askToOdin();
      console.log(secondAsk);

      const title = await odinSon.getTitle();
      console.log(title);
      
    });

  });

});
