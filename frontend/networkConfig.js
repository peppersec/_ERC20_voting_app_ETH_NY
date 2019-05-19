const networkConfig = {
  netId1: {
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
    tokenSymbol: 'ZRX',
    fromBlock: 10956027
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
    tokenSymbol: 'ZRX',
    fromBlock: 10956027
  },
  netId108: {
    rpcCallRetryAttempt: 15,
    gasPrice: { fast: 2, low: 1 },
    currencyName: 'TT',
    explorerUrl: {
      tx: 'https://scan.thundercore.com/transactions/'
    },
    networkName: 'Thunder',
    rpcUrl: 'https://mainnet-rpc.thundercore.com',
    votingContractAddress: '0xfbabf004bf835ea4d74b5425593b38dd4d297ce2',
    fromBlock: 7005679,
    tokenSymbol: 'ZRX'
  }
}

export default networkConfig
