<template>
  <div id="redirect" class="ui warning message" >
    <div class="header">Redirection</div>
    <p>You are now leaving (TPP) and we are securely<br />transfering you over to {{ currentAspsp.name }}</p>
  </div>
</template>

<script>
const redirectionTime = (process.env.REDIRECT_DELAY_SECONDS || 3);

export default {
  name: 'redirect',
  computed: {
    currentAspsp() {
      return this.$store.getters.selectedAspsp();
    },
  },
  beforeMount() {
    this.$store.dispatch('refreshSelectedAspsp');
    if (!this.currentAspsp) {
      this.$router.push('aspsp-selection');
    } else {
      window.setTimeout(() => {
        this.$router.push('accounts');
      }, redirectionTime * 1000);
    }
  },
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
