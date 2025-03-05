/* eslint-disable @typescript-eslint/naming-convention */
import hre from "hardhat";
import { AutomateSDK } from "@gelatonetwork/automate-sdk";
import { Contract } from "ethers";
import EventOracleJson from "../artifacts/contracts/EventOracle.sol/EventOracle.json"

async function main() {
  const chainId = hre.network.config.chainId as number;

  // Init GelatoOpsSDK
  const [signer] = await hre.ethers.getSigners();

  const eventOracleAddress = "0x7b8d30c0F605fCa77F2ec04661C11c369f630753";
  const eventOracle = new Contract(eventOracleAddress, EventOracleJson.abi , signer);

  let tx = await eventOracle.getPrice()
  let txReceipt = await tx.wait()


 let event = eventOracle.interface.parseLog(txReceipt.logs[0])
  console.log(event.signature)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
