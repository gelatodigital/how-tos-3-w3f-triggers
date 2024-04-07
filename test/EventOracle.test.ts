import hre from "hardhat";
import { expect } from "chai";
import { EventOracle } from "../typechain";
import { before } from "mocha";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  Web3FunctionEventContext,
  Web3FunctionUserArgs,
  Web3FunctionResultV2,
} from "@gelatonetwork/web3-functions-sdk";
import { Web3FunctionHardhat } from "@gelatonetwork/web3-functions-sdk/hardhat-plugin";
const { ethers, deployments, w3f } = hre;

describe("EventOracle Tests", function () {
  this.timeout(0);

  let owner: SignerWithAddress;

  let oracle: EventOracle;
  let simpleW3f: Web3FunctionHardhat;
  let userArgs: Web3FunctionUserArgs;

  before(async function () {
    await deployments.fixture();

    [owner] = await hre.ethers.getSigners();

    oracle = await ethers.getContract("EventOracle");
    simpleW3f = w3f.get("simple-event");


    userArgs = {
      currency: "ethereum",
      oracle: oracle.address,
    };
  });

  it("canExec: true - First execution", async () => {
 
    await expect (oracle.getPrice()).to.emit("GetPriceEvent()")

    });
});
