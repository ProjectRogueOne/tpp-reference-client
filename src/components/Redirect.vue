<template>
  <div class="ui warning message" >
    <div class="header">Redirection</div>
    <p>You are now leaving (TPP) and we are securely<br />transfering you over to {{ currentAspsp.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'redirect',
  data() {
    return {
      currentAspsp: this.$store.selectedAspsp,
    };
  },
  mounted() {
    window.setTimeout(() => {
      this.$router.push('accounts');
    }, 5000);
  },
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
