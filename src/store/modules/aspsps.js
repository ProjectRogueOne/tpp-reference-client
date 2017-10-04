import Vue from 'vue';
import { request } from '../request';

import {
  ASPSPS_FETCH,
  ASPSPS_SUCCESS,
  LOGOUT,
} from '../mutation-types';

const initialState = {
  aspsps: [],
  pending: false,
};

const getters = {
  aspsps: state => () => { // eslint-disable-line
    return state.aspsps;
  },
};

const mutations = {
  [ASPSPS_FETCH](state) {
    Vue.set(state, 'pending', true);
  },
  [ASPSPS_SUCCESS](state, payload) {
    const aspsps = payload.Resources;
    // sort alphabetically by name
    aspsps.sort((a, b) => {
      if (a.AuthorisationServers[0].CustomerFriendlyName
        > b.AuthorisationServers[0].CustomerFriendlyName) {
        return 1;
      } else if (a.AuthorisationServers[0].CustomerFriendlyName
        > b.AuthorisationServers[0].CustomerFriendlyName) {
        return -1;
      }
      return 0;
    });

    Vue.set(state, 'aspsps', aspsps);
    Vue.set(state, 'pending', false);
  },
};

const actions = {
  async fetchAspsps({ commit, dispatch }) {
    commit(ASPSPS_FETCH);
    const response = await request('/account-payment-service-providers', null, LOGOUT);
    if (response === LOGOUT) {
      return dispatch('deleteSession');
    } else if (response) {
      return commit(ASPSPS_SUCCESS, response);
    }
    return dispatch('deleteSession');
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
