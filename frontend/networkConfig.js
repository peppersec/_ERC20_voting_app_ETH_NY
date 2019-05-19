const networkConfig = {
  netId1: {
    rpcCallRetryAttempt: 15,
    gasPrice: { fast: 21, low: 1 },
    currencyName: 'ETH',
    explorerUrl: {
      tx: 'https://etherscan.io/tx/'
    },
    networkName: 'Ethereum Mainnet',
    rpcUrl: 'https://ethereum-rpc.trustwalletapp.com',
    votingContractAddress: '',
    smartContractPollTime: 15,
    gasOracleUrls: [
      'https://www.etherchain.org/api/gasPriceOracle',
      'https://gasprice.poa.network/'
    ],
    tokenDecimals: 18,
    tokenSymbol: 'ZRX'
  },
  netId42: {
    rpcCallRetryAttempt: 15,
    gasPrice: { fast: 2, low: 1 },
    currencyName: 'kETH',
    explorerUrl: {
      tx: 'https://kovan.etherscan.io/tx/'
    },
    networkName: 'Kovan',
    smartContractPollTime: 5,
    rpcUrl: 'https://kovan.infura.io/v3/5067eb1eff9d4f0e96c9761b116cd4bd',
    votingContractAddress: '0x3087e9c8095891f498c8686d1156863b9c8d1e4d',
    tokenDecimals: 18,
    tokenSymbol: 'ZRX'
  }
}

export default networkConfig
