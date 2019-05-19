const Web3 = require('web3');
const { soliditySha3 } = require('web3-utils');
const { MerkleTree } = require('./merkleTree.js');

const web3 = new Web3('https://localhost:8545');

function main({ participants }) {
  const merkleTreeLeafs = Object.entries(participants).map((holder, index) => {
    const leaf = web3.eth.abi.encodeParameters(['address', 'uint256'], holder);
    return soliditySha3(leaf);
  });
  const merkleTree = new MerkleTree(merkleTreeLeafs);
  return merkleTree
}

exports.default = main;
