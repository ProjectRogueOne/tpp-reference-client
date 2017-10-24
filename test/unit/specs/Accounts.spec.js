import Vue from 'vue';
import store from '@/store';
import Accounts from '@/components/Accounts';

const createAspsp = () => {
  const aspsp = {
    id: 'bbb-example-bank-http://bbb-example-bank.example.com',
    logoUri: '',
    name: 'BBB Example Bank',
    orgId: 'bbb-example-bank',
  };
  return aspsp;
};

describe('Accounts.vue with selected ASPSP', () => {
  it('renders ASPSP name and dont redirect', () => {
    const Construct = Vue.extend(Accounts);
    const vm = new Construct({ store });
    const aspsp = createAspsp();

    vm.$store.commit('LOGIN_SUCCESS');
    vm.$store.dispatch('selectAspsp', aspsp);
    vm.$mount();
    expect(vm.$el.textContent).to.include(`Accounts from ${aspsp.name}`);
  });
});
