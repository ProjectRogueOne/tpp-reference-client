<template>
  <div id="aspsp-selection">
    <div class="ui container">
      <h1 class="ui aligned header">Select preferred ASPSP account</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aspsp-selection',
  computed: {
    aspsps() {
      const aspsps = this.$store.getters.aspsps();
      if (!Array.isArray(aspsps) || aspsps.length === 0) {
        this.$store.dispatch('fetchAspsps');
      }
      return aspsps;
    },
  },
};
</script>
