import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const { 

  GOERLI_TESTNET_ENDPOINT_URL, 
  GOERLI_TESTNET_PRIVATE_KEY, 
  GOERLI_ETHERSCAN_API_KEY, 

  ARTHERA_TESTNET_PRIVATE_KEY,
  ARTHERA_DEVNET_PRIVATE_KEY

} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
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
    'goerli': {
      url: GOERLI_TESTNET_ENDPOINT_URL as string,
      accounts: GOERLI_TESTNET_PRIVATE_KEY !== undefined ? [GOERLI_TESTNET_PRIVATE_KEY] : [],
    },
    'arthera-testnet': {
      url: 'https://rpc-test.arthera.net',
      chainId: 10243,
      accounts: ARTHERA_TESTNET_PRIVATE_KEY !== undefined ? [ARTHERA_TESTNET_PRIVATE_KEY] : []
    },
    'arthera-devnet': {
      url: 'https://rpc-dev.arthera.net',
      chainId: 10245,
      accounts: ARTHERA_DEVNET_PRIVATE_KEY !== undefined ? [ARTHERA_DEVNET_PRIVATE_KEY] : []
  }
  }, 
};

export default config;
