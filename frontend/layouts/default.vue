<template>
  <div class="wrapper">
    <Navbar />
    <div class="main-content">
      <nuxt />
    </div>
    <footer class="footer">
      <div class="container">
        <p>
          ERC20 Voting DApp v1.00
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  components: {
    Navbar
  },
  async mounted() {
    try {
      await this.$store.dispatch('metamask/askPermission')
      this.$store.dispatch('metamask/fetchGasPrice', {})
      this.$store.dispatch('voting/fetchStats', {})
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
</script>
