import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const { 

  ARTHERA_DEVNET_RPC_ENDPOINT,

  ARTHERA_TESTNET_PRIVATE_KEY_1,
  ARTHERA_TESTNET_PRIVATE_KEY_2,
  ARTHERA_TESTNET_PRIVATE_KEY_3,
  ARTHERA_TESTNET_PRIVATE_KEY_4,
  ARTHERA_TESTNET_PRIVATE_KEY_5,
  ARTHERA_TESTNET_PRIVATE_KEY_6,
  ARTHERA_TESTNET_PRIVATE_KEY_7,
  ARTHERA_TESTNET_PRIVATE_KEY_8,
  ARTHERA_TESTNET_PRIVATE_KEY_9,
  ARTHERA_TESTNET_PRIVATE_KEY_10

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
    'arthera-devnet': {
      url: ARTHERA_DEVNET_RPC_ENDPOINT,
      chainId: 10245,
      accounts: [
        ARTHERA_TESTNET_PRIVATE_KEY_1 || '', 
        ARTHERA_TESTNET_PRIVATE_KEY_2 || '', 
        ARTHERA_TESTNET_PRIVATE_KEY_3 || '', 
        ARTHERA_TESTNET_PRIVATE_KEY_4 || '',
        ARTHERA_TESTNET_PRIVATE_KEY_5 || '',
        ARTHERA_TESTNET_PRIVATE_KEY_6 || '',
        ARTHERA_TESTNET_PRIVATE_KEY_7 || '',
        ARTHERA_TESTNET_PRIVATE_KEY_8 || '',
        ARTHERA_TESTNET_PRIVATE_KEY_9 || '',
        ARTHERA_TESTNET_PRIVATE_KEY_10 || ''
    ]
  }
  }, 
};

export default config;