<template>
  <div class="container">
    <section class="section future">
      <div class="columns is-vcentered mobile-reverse">
        <div class="column">
          <h1 class="title is-spaced">The Future of 0x Platform</h1>
          <p>
            It has been well over a year since we published the 0x white paper and shared our
            vision. Should we support Mattic network now?
          </p>
          <b-button
            v-scroll-to="'.vote'"
            type="is-primary"
            size="is-medium"
            class="chevron"
            rounded
          >
            Place Vote Now
          </b-button>
        </div>
        <div class="column">
          <div class="voting">
            <div class="voting-header">
              Voting
            </div>
            <div class="voting-line top"></div>
            <div class="voting-item">
              <div class="voting-label">
                Active ballot for:
              </div>
              <div class="voting-value">
                Mattic network support
              </div>
            </div>
            <div class="voting-line bottom"></div>
            <div class="voting-item">
              <div class="voting-label">
                To sumbit votes:
              </div>
              <div class="voting-value">
                {{ `${duration.days}:${duration.hours}:${duration.minutes}:${duration.seconds}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section vote">
      <div class="columns">
        <div class="column">
          <div class="vote-icon">
            <b-icon icon="check" size="is-large" type="is-success"> </b-icon>
          </div>
          <h4>
            Yes
          </h4>
          <p>
            This proposal constructs a new token specifically designed and categorized as new token
            on Mattic Network
          </p>
          <b-button
            type="is-primary"
            size="is-medium"
            class="chevron"
            rounded
            @click="callVote({ votingOption: 2 })"
          >
            Vote "Yes"
          </b-button>
          <a v-scroll-to="'.structure'" href="#" class="link">Read more</a>
        </div>
        <div class="column">
          <div class="vote-icon">
            <b-icon icon="close" size="is-large" type="is-danger"> </b-icon>
          </div>
          <h4>
            No
          </h4>
          <p>
            This vote means the community prefers to keep 0x token to the exact policy described in
            our white paper
          </p>
          <b-button
            type="is-primary"
            size="is-medium"
            class="chevron"
            rounded
            @click="callVote({ votingOption: 1 })"
          >
            Vote for "No"
          </b-button>
          <a v-scroll-to="'.structure'" href="#" class="link">Read more</a>
        </div>
      </div>

      <div v-if="voteTx.txHash && voteTx.status !== 1" class="token-field">
        <div class="label">Transaction hash</div>
        <div class="txs">
          <div class="txs__item" :class="txStatusClass(voteTx.status)">
            <div class="txs__status"></div>
            <a :href="txExplorerUrl('voteTx')" class="txs__address" target="_blank">
              {{ txHashToRender('voteTx') }}
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="section results">
      Current Voting Results: <br /><br />
      No {{ votingResults.noPercent }}% Votes: {{ votingResults.noVotes }}
      {{ networkConfig.tokenSymbol }}<br />
      Yes {{ votingResults.yesPercent }}% Votes: {{ votingResults.yesVotes }}
      {{ networkConfig.tokenSymbol }}<br />
      Total Voted {{ votingResults.totalVoted }} {{ networkConfig.tokenSymbol }}
    </section>
    <section class="section wallet">
      <div class="columns is-gapless">
        <div class="column left-column">
          <div class="border left-border">
            <div class="logo">
              <img src="~/assets/img/logo-blue.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="column right-column">
          <div class="border right-border">
            <div v-if="ethAccount" class="wallet-item">
              <div class="wallet-item__name">Your Address</div>
              <div class="wallet-item__value">{{ ethAccount }}</div>
            </div>
            <div class="columns is-gapless">
              <div class="column">
                <div class="wallet-item">
                  <div class="wallet-item__name">Your Balance</div>
                  <div class="wallet-item__value">{{ balance }} <span>ZRX</span></div>
                </div>
              </div>
              <div class="column">
                <div class="wallet-item">
                  <div class="wallet-item__name">Your Decision</div>
                  <div class="wallet-item__value">
                    <a :href="txExplorerUrl('voteTx')" target="_blank">{{ decision }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-message type="is-warning" :active.sync="isError">
        Current address {{ ethAccount }} is not in the voting list.
      </b-message>
    </section>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: null
    }
  },
  name: 'Voting',
  computed: {
    ...mapState('voting', ['voteTx', 'decision', 'duration', 'votingResults', 'isLoaded']),
    ...mapGetters('voting', [
      'txExplorerUrl',
      'txHashToRender',
      'txStatusClass',
      'isUserInVotingList',
      'balance'
    ]),
    ...mapState('metamask', ['ethAccount']),
    ...mapGetters('metamask', ['networkConfig']),
    isError() {
      return !this.isUserInVotingList
    }
  },
  mounted() {
    this.loading = this.$loading.open({ container: null })
  },
  watch: {
    isLoaded: function(newLoadState) {
      this.loading.close()
      this.loading = null
    }
  },
  methods: {
    ...mapActions('voting', ['vote']),
    callVote({ votingOption }) {
      this.loading = this.$loading.open({ container: null })
      setTimeout(() => {
        this.vote({ votingOption })
      }, 1000)
    }
  }
}
</script>
