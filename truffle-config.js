require('babel-register');
require('babel-polyfill');
require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.MNEMONIC;
var tokenKey= process.env.TOKENKEY

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" ,// Match any network id
      websockets:true
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, `https://eth-rinkeby.alchemyapi.io/v2/${tokenKey}`);
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
  }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version:"^0.8.0",
      settings:{
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}
