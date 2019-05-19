# Demo
http://voting.peppersec.com/
Use ThunderToken RPC endpoint (rpcUrl: 'https://mainnet-rpc.thundercore.com') with Metamask

# Deployment
1. Go to thegraph.com and index any ERC20 token with Transfer events
2. go to address_list_generator folder, install `npm i` 
3. Get SKALE.com RPC endpoint
4. Set Skale RPC endpoint and private key in `address_list_generator/.env` file
5. Set `THEGRAPH_ENDPOINT` in `address_list_generator/.env` file
6. Run `address_list_generator/generate.js` - it generates merkle tree root hash, uploads it to 
Skale FileStorage.
7. Deploy Smart contract:
- `npm i ` in contracts/ folder
- `npm run flat`
- `flats/FLAT_ERC20Voting.sol` - deploy in REMIX with params from step # 6:
    - merkleTreeHashRoot
    - SkaleLinkUrl
    - expirationdate(unix)
    - ballot question
8. Open frontend/
9. npm i
10. open `networkConfig.js`, set your contract address
11. yarn dev -o - opens localhost:3000
