import Vue from 'vue';
import Vuex from 'vuex';
import accounts from './modules/accounts';
import aspsps from './modules/aspsps';
import session from './modules/session';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    accounts,
    aspsps,
    session,
  },
  actions,
});
