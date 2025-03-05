import hre, { deployments, getNamedAccounts } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const isHardhat = hre.network.name === "hardhat";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  if (!isHardhat) {
    console.log(
      `\nDeploying Counter to ${hre.network.name}. Hit ctrl + c to abort`
    );
  }

  // For Gelato Automate, we need the Automate contract address
  // These are example addresses - replace with the correct ones for your target network
  const automateAddress = "0xafd37d0558255aA687167560cd3AaeEa75c2841E"; // Example address
  const taskCreator = deployer; // Using deployer as task creator

  await deploy("Counter", {
    from: deployer,
    args: [automateAddress, taskCreator],
    log: !isHardhat,
  });
};

func.tags = ["Counter"];

export default func;