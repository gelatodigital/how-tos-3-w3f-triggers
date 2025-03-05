import { HardhatUserConfig } from "hardhat/config";

// PLUGINS
import "@gelatonetwork/web3-functions-sdk/hardhat-plugin";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";

// ================================= TASKS =========================================

// Process Env Variables
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ROOTSTOCK_RPC_URL = process.env.ROOTSTOCK_RPC_URL;
const accounts: string[] =  PRIVATE_KEY ? [PRIVATE_KEY] : [];

// ================================= CONFIG =========================================
const config: HardhatUserConfig = {
  w3f: {
    rootDir: "./web3-functions",
    debug: false,
    networks: ["mumbai", "goerli", "baseGoerli", "rootstocktestnet"], //(multiChainProvider) injects provider for these networks
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: `https://rpc.arb-blueberry.gelato.digital`,
        //blockNumber:1 ,
      },
    },

    // Shared Testnet
   blueberry: {
      accounts,
      chainId: 88153591557,
      url: `https://rpc.arb-blueberry.gelato.digital`,
    },
    raspberry: {
      accounts,
      chainId: 123420111,
      url: `https://rpc.opcelestia-raspberry.gelato.digital`,
    },
    blackberry: {
      accounts,
      chainId: 94204209,
      url: `https://rpc.polygon-blackberry.gelato.digital`,
    },
    rootstocktestnet: {
      accounts,
      chainId: 31,
      url: ROOTSTOCK_RPC_URL,
    },
  },
  etherscan: {
    apiKey: {
      blueberry: "xxx",
      rootstocktestnet: "xxx"
    },
    customChains: [
      {
        network: "blueberry",
        chainId: 88153591557,
        urls: {
          apiURL: "https://arb-blueberry.gelatoscout.com/api",
          browserURL: "https://arb-blueberry.gelatoscout.com"
        }
      },
      {
        network: "rootstocktestnet",
        chainId: 31,
        urls: {
          apiURL: "https://rootstock-testnet.blockscout.com/api",
          browserURL: "https://rootstock-testnet.blockscout.com"
        }
      }
    ]
  },

  solidity: {
    compilers: [
      {
        version: "0.8.23",

        settings: {
          evmVersion: 'paris',
          optimizer: { enabled: true , runs:200},
        },
      },
    ],
  },

  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },

};

export default config;
