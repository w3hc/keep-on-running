import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const { 

  ARTHERA_TESTNET_PRIVATE_KEY_1,
  ARTHERA_TESTNET_PRIVATE_KEY_2,
  ARTHERA_TESTNET_PRIVATE_KEY_3,
  ARTHERA_TESTNET_PRIVATE_KEY_4

} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
      
    }
  },
  mocha: {
    timeout: 100000
  },
  networks: {
    'hardhat': {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    // 'goerli': {
    //   url: GOERLI_TESTNET_ENDPOINT_URL as string,
    //   accounts: GOERLI_TESTNET_PRIVATE_KEY !== undefined ? [GOERLI_TESTNET_PRIVATE_KEY] : [],
    // },
    'arthera-devnet': {
      url: 'https://rpc-dev.arthera.net',
      chainId: 10245,
      accounts: [ARTHERA_TESTNET_PRIVATE_KEY_1 || '', ARTHERA_TESTNET_PRIVATE_KEY_2 || '', ARTHERA_TESTNET_PRIVATE_KEY_3 || '', ARTHERA_TESTNET_PRIVATE_KEY_4 || '']
  }
  }, 
};

export default config;
