<template>
  <div id="accounts">
    <div class="ui container">
      <h1 class="ui aligned header">Accounts from {{ aspspName }}</h1>
      <div class="ui hidden divider"></div>
      <div class="ui error message" v-if="sessionExpired">
        <div class="header">Your session has expired</div>
        <p>Please <a href="/">login</a> again.</p>
      </div>
      <account v-for="account in accounts"
        v-bind:key="account.AccoundId"
        v-bind:account="account"
        v-bind:aspsp="aspsp">
      </account>
      <div class="ui hidden divider"></div>
      <logout></logout>
    </div>
  </div>
</template>

<script>
import Account from './Account';
import Logout from './Logout';

export default {
  name: 'accounts',
  components: { Account, Logout },
  computed: {
    sessionExpired() {
      return !this.$store.getters.isLoggedIn();
    },
    aspsp() {
      return 'abcbank';
    },
    currentAspsp() {
      return this.$store.getters.getSelectedAspsp();
    },
    aspspName() {
      return this.currentAspsp.name;
    },
    accounts() {
      const accounts = this.$store.getters.accounts(this.aspsp);
      if (!Array.isArray(accounts) || accounts.length === 0) {
        this.$store.dispatch('populateAccounts');
      }
      return accounts;
    },
  },
  mounted() {
    if (!this.currentAspsp) {
      this.$router.push('aspsp-selection');
    }
  },
};
</script>

<style>
body {
  background: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.06);
  color: #545454;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0 auto;
  max-width: 800px;
  padding: 2em 2em 4em;
}
</style>
