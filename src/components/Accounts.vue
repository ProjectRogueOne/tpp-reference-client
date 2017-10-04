<template>
  <div id="accounts">
    <div class="ui container">
      <h1 class="ui aligned header">Accounts</h1>
      <div class="ui hidden divider"></div>
      <div class="ui error message" v-if="sessionExpired">
        <div class="header">Your session has expired</div>
        <p>Please <a href="/">login</a> again.</p>
      </div>
      <div class="ui cards">
        <account v-for="account in accounts"
          v-bind:key="account.AccoundId"
          v-bind:account="account"
          v-bind:aspsp="aspsp">
        </account>
      </div>
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
    accounts() {
      const accounts = this.$store.getters.accounts(this.aspsp);
      if (!Array.isArray(accounts) || accounts.length === 0) {
        this.$store.dispatch('populateAccounts');
      }
      return accounts;
    },
  },
};
</script>
