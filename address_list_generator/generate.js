require('dotenv').config();
const { 
  SKALE_PRIVATE_KEY,
  SKALE_ADDRESS,
  SKALE_RPC_ENDPOINT,
  GENESIS_TOKEN_OWNER_ADDRESS,
  GENESIS_TOKEN_OWNER_AMOUNT,
  THEGRAPH_ENDPOINT
} = process.env;
const fetch = require('node-fetch')
const BN = require('bignumber.js')
const { toChecksumAddress } = require('web3-utils')
const merkleTreeGenerator = require('./merkleTreeGenerator').default
const Filestorage = require('@skalenetwork/filestorage.js/src/index')
const Web3 = require('web3')


async function fetchTransfers({ skip }) {
    const first = 100
    let query = `{ transfers(first: ${first}, skip: ${skip}) {
        id
        from
        to
        value
      }
    }`
    const body = JSON.stringify({ query, variables: null })
    let result = await fetch(THEGRAPH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body
    })
    result = await result.json()
    return result.data.transfers
}

async function loadToSkale({ data, fileName }) {
    const web3Provider = new Web3.providers.HttpProvider(SKALE_RPC_ENDPOINT);
    let filestorage = new Filestorage(web3Provider);
    const link = await filestorage.uploadFile(SKALE_ADDRESS, fileName, Buffer.from(JSON.stringify(data)), SKALE_PRIVATE_KEY);
    return link
}

async function main() {
    let addresses = {}
    if (GENESIS_TOKEN_OWNER_ADDRESS) {
      addresses[GENESIS_TOKEN_OWNER_ADDRESS] = GENESIS_TOKEN_OWNER_AMOUNT
    }
    let skip = 0
    let transfers = await fetchTransfers({ skip })
    // transfers.forEach(({from, to, value}) => {
    //     try {
    //         to = toChecksumAddress(to)
    //         from = toChecksumAddress(from)
    //         addresses[to] = BN(addresses[to] || 0).plus(value.toString(10)).toFixed()
    //         addresses[from] = BN(addresses[from] || 0).minus(value.toString(10)).toFixed()
    //       } catch(e) {
    //         console.error(e)
    //       }
    // })

    while(transfers.length > 0) {
        skip += 100
        transfers = await fetchTransfers({ skip })
        transfers.forEach(({from, to, value}) => {
            try {
                to = toChecksumAddress(to)
                from = toChecksumAddress(from)
                addresses[to] = BN(addresses[to] || 0).plus(value.toString(10)).toFixed()
                addresses[from] = BN(addresses[from] || 0).minus(value.toString(10)).toFixed()
              } catch(e) {
                console.error(e)
              }
        })
    }
    const { holders, total } = Object.entries(addresses).reduce((accum, [address, value]) => {
        if (!BN(value).isZero()) {
          accum.holders[address] = value
          accum.total = accum.total.plus(BN(value))
        }
        return accum
    }, { holders: {}, total: BN(0) })
    console.log('total', total.toFixed())
    const tree = merkleTreeGenerator({ participants: holders })
    const root = tree.getHexRoot()
    const fileName = root + '_' + Date.now()
    console.log('fileName', fileName)
    const skaleFileStorageLink = await loadToSkale({ data: addresses, fileName })
    console.log('skaleFileStorageLink', skaleFileStorageLink)
}

main()