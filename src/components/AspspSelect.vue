<template>
  <div class="aspsp-select item">
    <div class="ui tiny image">
      <img src="">
    </div>
    <div class="middle aligned content">
      <div class="header">
        <a v-on:click="selectAspsp">{{ customerFriendlyName }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aspsp-select',
  props: ['aspsp'],
  computed: {
    customerFriendlyName() {
      return this.aspsp.AuthorisationServers[0].CustomerFriendlyName;
    },
  },
  methods: {
    selectAspsp() {
      this.$router.push('accounts');
    },
  },
  data() {
    return { };
  },
};
</script>

<style scoped>
.aspsp-select.item {
  width: 390px;
}
</style>
