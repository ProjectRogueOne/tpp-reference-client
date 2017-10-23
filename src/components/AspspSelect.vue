<template>
  <div class="aspsp-select item">
    <div class="ui hidden divider"></div>
    <div class="ui tiny image">
      <img src="">
    </div>
    <div class="middle aligned content">
      <div class="header">
        <a class="select-aspsp" v-on:click="selectAspsp(aspsp)" >{{ name }}</a>
      </div>
    </div>
    <div class="ui hidden divider"></div>
  </div>
</template>

<script>
export default {
  name: 'aspsp-select',
  props: ['aspsp'],
  computed: {
    name() {
      return this.aspsp.name;
    },
  },
  methods: {
    selectAspsp(selectedAspsp) {
      this.$store.selectedAspsp = selectedAspsp;
      this.$router.push('redirect');
    },
  },
};
</script>

<style scoped>
.aspsp-select.item {
  width: 70%;
}
</style>
