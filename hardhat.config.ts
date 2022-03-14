import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import { task } from "hardhat/config";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { hexConcat } from "@ethersproject/bytes";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-web3";
import "hardhat-docgen";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "./tasks";

require('@nomiclabs/hardhat-ethers');

require('dotenv').config()
require('./tasks')

const chainIds: { [key: string]: number } = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  polygonMumbai: 80001,
}

let mnemonic: string
if (!process.env.MNEMONIC) {
  throw new Error('Please set your MNEMONIC in a .env file')
} else {
  mnemonic = process.env.MNEMONIC
}

let infuraApiKey: string
if (!process.env.INFURA_API_KEY) {
  throw new Error('Please set your INFURA_API_KEY in a .env file')
} else {
  infuraApiKey = process.env.INFURA_API_KEY
}

function createNetworkConfig(network: string) {
  const url = 'https://' + network + '.infura.io/v3/' + infuraApiKey
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[network],
    url,
    gas: 'auto',
    gasPrice: 60000000000
  }
}


module.exports = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey:{
      mainnet: process.env.ETHER_API_KEY,
      ropsten: process.env.ETHER_API_KEY,
      rinkeby: process.env.ETHER_API_KEY,
      goerli: process.env.ETHER_API_KEY,
      kovan: process.env.ETHER_API_KEY,
      // binance smart chain
      bsc: process.env.BSC_API_KEY,
      bscTestnet: process.env.BSC_API_KEY,
      // polygon
      //polygon: process.env.POLYGON_API_KEY,
      polygonMumbai: process.env.POLYGON_API_KEY,
    }
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_API_HTTP,
        blockNumber: 10000000
      },
      accounts: {
        mnemonic,
      },
      chainId: chainIds.hardhat,
    },
    mainnet: createNetworkConfig('mainnet'),
    goerli:  {
      url: process.env.GOERLI_INFURA,
      accounts: { 
        mnemonic: process.env.MNEMONIC
      },
    },
    kovan: createNetworkConfig('kovan'),
    rinkeby: {
      // gas: 5000000,
      // gasPrice: 20000000000,
      //url: process.env.INFURA_URL,
      url: process.env.ALCHEMY_API_HTTP,
      accounts: { 
        mnemonic: process.env.MNEMONIC
      },
    },
    ropsten: createNetworkConfig('ropsten'),

    bsc_testnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      chainId: 97,
      gasPrice: 'auto',
      // gasLimit: 10000000,
      accounts: { mnemonic: mnemonic },
    },
    bsc: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 5000000000,
      // gasLimit: 10000000,
      accounts: { mnemonic: mnemonic },
    },
    // Z
    polygonMumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      accounts: { mnemonic: mnemonic },
    },
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  solidity: {
    compilers: [
      {
        version: '0.8.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  docgen: {
    path: './docs',
    clear: false,
    runOnCompile: true,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  gasReporter: {
    currency: 'CHF',
    gasPrice: 0.00000007
  }
}




// const { MNEMONIC, INFURA_URL, TOKEN_ADDR, DAO_ADDR } = process.env;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// export default {
//   solidity: {
//     compilers: [
//       {
//         version: '0.8.6',
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//     ],
//   },
//   networks: {
//     rinkeby: {
//       // gas: 5000000,
//       // gasPrice: 20000000000,
//       url: INFURA_URL,
//       accounts: { 
//         mnemonic: MNEMONIC
//       },
//     }
//   },
//   contractSizer: {
//     alphaSort: true,
//     disambiguatePaths: false,
//     runOnCompile: true,
//     strict: true,
//     // only: [':ERC20$'],
//   }
// };
