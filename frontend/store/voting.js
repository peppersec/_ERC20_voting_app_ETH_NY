/* eslint-disable no-console */
import moment from 'moment'
import BN from 'bignumber.js'
import Web3 from 'web3skale'
import Filestorage from '@skalenetwork/filestorage.js/src/index'
import votingABI from '../static/voting.abi.json'
const { numberToHex, hexToNumber, soliditySha3 } = require('web3-utils')
export const state = () => ({
  voteTx: {
    txHash: '',
    status: null
  },
  expirationDate: 0,
  decision: 'Not Voted',
  duration: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  },
  votingResults: {
    noPercent: 0,
    yesPercent: 0,
    noVotes: 0,
    yesVotes: 0,
    totalVoted: 0
  },
  participants: {},
  isLoaded: false,
  skaleFileLink: ''
})

export const getters = {
  balance: (state, getters, rootState, rootGetters) => {
    const ethAccount = rootState.metamask.ethAccount
    const { tokenDecimals } = rootGetters['metamask/networkConfig']
    const withDecimals = BN(state.participants[ethAccount]).div(BN(10).pow(tokenDecimals))
    return withDecimals.toFormat()
  },
  votingInstance: (state, getters, rootState, rootGetters) => {
    const web3 = rootGetters['metamask/web3']
    const { votingContractAddress } = rootGetters['metamask/networkConfig']
    return new web3.eth.Contract(votingABI, votingContractAddress)
  },
  txExplorerUrl: (state, getters, rootState, rootGetters) => txName => {
    const { explorerUrl } = rootGetters['metamask/networkConfig']
    return explorerUrl.tx + state[txName].txHash
  },
  txHashToRender: state => (txName, txHash) => {
    const hash = txHash || state[txName].txHash
    return hash.slice(0, 20) + '...' + hash.slice(-20)
  },
  txStatusClass: state => status => {
    let cssClass
    switch (status) {
      case 1: // success
        cssClass = 'is-success'
        break
      case 0: // fail
        cssClass = 'is-danger'
        break
      default:
        cssClass = 'is-loading'
        break
    }
    return cssClass
  },
  isUserInVotingList: (state, getters, rootState, rootGetters) => {
    const ethAccount = rootState.metamask.ethAccount
    return state.participants[ethAccount] !== undefined
  },
  merkleTreeLeafs: (state, getters, rootState, rootGetters) => {
    const web3 = rootGetters['metamask/web3']
    return Object.entries(state.participants).map(holder => {
      const leaf = web3.eth.abi.encodeParameters(['address', 'uint256'], holder)
      return soliditySha3(leaf)
    })
  },
  userMerkleTreeLeaf: (state, getters, rootState, rootGetters) => {
    const web3 = rootGetters['metamask/web3']
    const ethAccount = rootState.metamask.ethAccount
    return soliditySha3(
      web3.eth.abi.encodeParameters(
        ['address', 'uint256'],
        [ethAccount, state.participants[ethAccount]]
      )
    )
  },
  expectedVotingAmount: state => {
    return Object.entries(state.participants).reduce((accum, [ethAccount, value]) => {
      accum = accum.plus(value)
      return accum
    }, BN('0'))
  }
}

export const mutations = {
  SAVE_VOTE_TX_HASH(state, { txHash }) {
    this._vm.$set(state.voteTx, 'txHash', txHash)
  },
  CHANGE_VOTE_TX_STATUS(state, { status }) {
    this._vm.$set(state.voteTx, 'status', status)
  },
  SAVE_EXPIRATION_DATE(state, expirationDate) {
    state.expirationDate = expirationDate
  },
  SAVE_DECISION(state, decision) {
    state.decision = decision
  },
  SAVE_DURATION(state, duration) {
    state.duration = duration
  },
  SAVE_PARTICIPANTS(state, participants) {
    state.participants = participants
  },
  FINISH_LOADING(state) {
    state.isLoaded = !state.isLoaded
  },
  SAVE_SKALE_LINK(state, skaleFileLink) {
    state.skaleFileLink = skaleFileLink
  },
  SAVE_VOTING_PERCENTAGES(
    state,
    { noPercent, yesPercent, noVotes, yesVotes, totalVoted, tokenDecimals }
  ) {
    const power = BN(10).exponentiatedBy(tokenDecimals)
    this._vm.$set(state, 'votingResults', {
      noPercent: BN(noPercent)
        .dividedBy(100)
        .toString(10),
      yesPercent: BN(yesPercent)
        .dividedBy(100)
        .toString(10),
      noVotes: BN(noVotes)
        .div(power)
        .toFormat(),
      yesVotes: BN(yesVotes)
        .div(power)
        .toFormat(),
      totalVoted: BN(totalVoted)
        .div(power)
        .toFormat()
    })
  }
}

export const actions = {
  async vote({ dispatch, getters, rootGetters, rootState, commit, state }, { votingOption }) {
    try {
      const gasPrice = rootGetters['metamask/gasPrice']
      const { ethAccount } = rootState.metamask
      const { votingInstance } = getters
      const votingAmount = state.participants[ethAccount]
      const merkleTree = new this.$merkleTree(getters.merkleTreeLeafs)
      const proof = merkleTree.getHexProof(getters.userMerkleTreeLeaf)
      commit('FINISH_LOADING')
      console.log('gas', votingOption, votingAmount, proof, ethAccount, state.participants)
      const data = votingInstance.methods.vote(votingOption, votingAmount, proof).encodeABI()
      const gas = await votingInstance.methods
        .vote(votingOption, votingAmount, proof)
        .estimateGas({ from: ethAccount })
      const callParams = {
        method: 'eth_sendTransaction',
        params: [
          {
            from: ethAccount,
            to: votingInstance.address,
            gas: numberToHex(gas + 10000),
            gasPrice,
            data
          }
        ],
        from: ethAccount
      }
      const txHash = await dispatch('metamask/sendAsync', callParams, {
        root: true
      })
      commit('SAVE_VOTE_TX_HASH', { txHash })

      const { status } = await dispatch('metamask/waitForTxReceipt', { txHash }, { root: true })
      await dispatch('askVotingForChanges', {
        method: 'votes',
        params: [ethAccount],
        currentValue: 0
      })
      commit('SAVE_DECISION', votingOption)
      commit('CHANGE_VOTE_TX_STATUS', { status: hexToNumber(status) })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchExpiration({ getters, commit, dispatch }) {
    const { votingInstance } = getters
    let expirationDate = await votingInstance.methods.expirationDate().call()
    expirationDate = Number(expirationDate.toString())
    commit('SAVE_EXPIRATION_DATE', expirationDate)
    dispatch('calcutateDuration')
  },
  async fetchSkaleLink({ getters, commit, dispatch }) {
    const { votingInstance } = getters
    let skaleFileLink = await votingInstance.methods.skaleFileLink().call()
    skaleFileLink = skaleFileLink.toString()
    commit('SAVE_SKALE_LINK', skaleFileLink)
  },
  async fetchVotingPercentages({ getters, commit, dispatch, rootGetters }) {
    const { smartContractPollTime, tokenDecimals } = rootGetters['metamask/networkConfig']
    try {
      const { votingInstance, expectedVotingAmount } = getters
      const {
        noPercent,
        yesPercent,
        noVotes,
        yesVotes,
        totalVoted
      } = await votingInstance.methods.votingPercentages(expectedVotingAmount.toString(10)).call()
      commit('SAVE_VOTING_PERCENTAGES', {
        noPercent,
        yesPercent,
        noVotes,
        yesVotes,
        totalVoted,
        tokenDecimals
      })
    } catch (e) {
      console.error('fetchVotingPercentages', e)
    }
    setTimeout(() => {
      dispatch('fetchVotingPercentages')
    }, smartContractPollTime * 1000)
  },
  calcutateDuration({ state, commit, dispatch }) {
    const { expirationDate } = state
    const currentTime = moment().unix()
    const duration = moment.duration(expirationDate - currentTime, 'seconds')
    const durationLeft = {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds()
    }
    commit('SAVE_DURATION', durationLeft)
    setTimeout(() => {
      dispatch('calcutateDuration')
    }, 1000)
  },
  async fetchDecision({ getters, commit, rootState, rootGetters }) {
    const { votingInstance } = getters
    const { ethAccount } = rootState.metamask
    const { fromBlock } = rootGetters['metamask/networkConfig']
    const event = await votingInstance.getPastEvents('NewVote', {
      fromBlock,
      toBlock: 'latest',
      filter: { who: ethAccount }
    })
    if (event.length) {
      commit('SAVE_DECISION', event[0].returnValues.vote)
      commit('SAVE_VOTE_TX_HASH', { txHash: event[0].transactionHash })
      commit('CHANGE_VOTE_TX_STATUS', { status: 1 })
    }
  },
  async fetchStats({ dispatch, commit }) {
    dispatch('fetchVotingPercentages')
    await dispatch('fetchSkaleLink')
    dispatch('fetchParticipants')
    dispatch('fetchExpiration')
    dispatch('fetchDecision')
  },
  async fetchParticipants({ commit, state }) {
    const web3Provider = new Web3.providers.HttpProvider('http://157.230.154.5:8112')
    const filestorage = new Filestorage(web3Provider)
    const file = await filestorage.downloadToBuffer(state.skaleFileLink)
    commit('SAVE_PARTICIPANTS', JSON.parse(file))
    commit('FINISH_LOADING')
  },
  askVotingForChanges({ dispatch, getters, rootGetters }, { method, params = [], currentValue }) {
    const { votingInstance } = getters
    const { rpcCallRetryAttempt } = rootGetters['metamask/networkConfig']
    const data = votingInstance.methods[method](...params).encodeABI()
    currentValue = new BN(currentValue)
    return new Promise(async (resolve, reject) => {
      const checkForChanges = async ({ retryAttempt = 0, currentValue, rpcCallRetryAttempt }) => {
        retryAttempt++
        const newValue = await dispatch(
          'metamask/callWeb3',
          { data, to: votingInstance.address, web3Method: 'call' },
          { root: true }
        )
        if (new BN(newValue).isEqualTo(currentValue)) {
          if (retryAttempt > rpcCallRetryAttempt) {
            return reject(new Error(`return value of '${method}' method was not changed`))
          }
          setTimeout(async () => {
            await checkForChanges({ retryAttempt, currentValue, rpcCallRetryAttempt })
          }, 1000 * retryAttempt)
        } else {
          return resolve(newValue)
        }
      }
      await checkForChanges({ currentValue, rpcCallRetryAttempt })
    })
  }
}
