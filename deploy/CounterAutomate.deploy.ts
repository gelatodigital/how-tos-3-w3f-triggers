import hre, { deployments, getNamedAccounts } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const isHardhat = hre.network.name === "hardhat";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  if (!isHardhat) {
    console.log(
      `\nDeploying CounterAutomate to ${hre.network.name}. Hit ctrl + c to abort`
    );
  }

  await deploy("CounterAutomate", {
    from: deployer,
    args: [], // No constructor arguments
    log: !isHardhat,
  });
};

func.tags = ["CounterAutomate"];

export default func; 