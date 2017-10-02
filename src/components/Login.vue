<template>
  <div id="login" class="ui container">
    <h1 class="ui aligned header">Login to view balances</h1>
    <div class="ui hidden divider"></div>
    <div class="ui error message" v-if="invalidCredentials">
      <div class="header">Invalid username or password</div>
      <p>Try again with different username and/or password.</p>
    </div>
    <div class="ui error message" v-if="loginError">
      <div class="header">We are having issues with our login system</div>
      <p>Try again later.</p>
    </div>
      <form class="ui form" @submit.prevent="login({ username, password })">
        <div class="field">
          <label for="username">Username</label>
          <input name="u" type="text" placeholder="username" v-model="username">
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input name="p" type="password" placeholder="password" v-model="password">
        </div>
        <button name="login" class="ui large primary submit button">
        Login
        </button>
      </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: 'alice',
      password: 'wonderland',
    };
  },
  computed: {
    invalidCredentials() {
      return this.$store.getters.invalidCredentials();
    },
    loginError() {
      return this.$store.getters.loginError();
    },
  },
  methods: {
    async login() {
      await this.$store.dispatch('createSession', {
        u: this.username,
        p: this.password,
      });
      if (this.$store.getters.isLoggedIn()) {
        await this.$store.dispatch('populateAccounts');
        this.$router.push('aspsp-selection');
      }
    },
  },
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
