import hre, { deployments, getNamedAccounts } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const isHardhat = hre.network.name === "hardhat";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  if (!isHardhat) {
    console.log(
      `\nDeploying CounterResolverWT to ${hre.network.name}. Hit ctrl + c to abort`
    );
  }

  // Get the deployed Counter contract
  const counterDeployment = await get("Counter");
  console.log("Counter deployed to:", counterDeployment.address);
  console.log("0x2f32A4796bc8A37229FCfe8018f1fd6FBA19471C");

  await deploy("CounterResolverWT", {
    from: deployer,
    args: [counterDeployment.address], // Pass the Counter contract address
    log: !isHardhat,
  });
};

// This script depends on the Counter contract being deployed first
func.tags = ["CounterResolverWT"];
func.dependencies = ["Counter"];

export default func; 