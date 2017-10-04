<template>
  <div id="aspsp-selection">
    <div class="ui container">
      <h1 class="ui aligned header">Select preferred ASPSP account</h1>
      <div class="ui hidden divider"></div>
      <div class="ui divided items">
        <aspsp-select v-for="aspsp in aspsps"
          v-bind:key="aspsp.id"
          v-bind:aspsp="aspsp">
        </aspsp-select>
      </div>
    </div>
  </div>
</template>

<script>
import AspspSelect from './AspspSelect';

export default {
  name: 'aspsp-selection',
  components: { AspspSelect },
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
