<template>
  <span class="balance-available" v-if="availableBalance">
    <span class="label">Available: </span>
    <span class="amount">{{
      formatAmount(availableBalance.CreditDebitIndicator,
        availableBalance.Amount.Amount,
        availableBalance.Amount.Currency)
    }}</span>
  </span>
</template>

<script>
const groupby = require('lodash.groupby');
const sortby = require('lodash.sortby');
const currencyFormatter = require('currency-formatter');

export default {
  name: 'balance-available',
  props: ['balances'],
  methods: {
    formatAmount(debitcredit, amount, code) {
      const formatted = currencyFormatter.format(amount, { code });
      if (debitcredit === 'Debit') {
        return `-${formatted}`;
      }
      return formatted;
    },
    isAvailableBalance(balance) {
      switch (balance.Type) {
        case 'ClosingAvailable':
        case 'InterimAvailable':
        case 'OpeningAvailable':
        case 'ForwardAvailable':
          return true;
        default:
          return false;
      }
    },
    sortDatetimeDescending(balances) {
      return sortby(balances, b => b.DateTime).reverse();
    },
    bestMatchWithoutDateTime(list) {
      const byType = groupby(list, b => b.Type);
      if (byType.ClosingAvailable) return byType.ClosingAvailable[0];
      if (byType.InterimAvailable) return byType.InterimAvailable[0];
      if (byType.OpeningAvailable) return byType.OpeningAvailable[0];
      if (byType.ForwardAvailable) return byType.ForwardAvailable[0];
      return null;
    },
    bestMatch(available) {
      const orderedByDate = this.sortDatetimeDescending(available);
      const latestDateTime = orderedByDate[0].DateTime;
      const byDatetime = groupby(available, b => b.DateTime);
      const recent = byDatetime[latestDateTime];
      if (recent.length > 1) {
        return this.bestMatchWithoutDateTime(recent);
      }
      return recent[0];
    },
  },
  computed: {
    availableBalances() {
      return this.balances.filter(this.isAvailableBalance);
    },
    availableBalance() {
      const available = this.availableBalances;
      if (available.length > 0) {
        return this.bestMatch(available);
      }
      return null;
    },
  },
};
</script>

<style scoped>
.balance-available {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #545454;
  margin-top: 3px;
}
.balance-available .label {
  font-size: 12px;
}
.balance-available .amount {
  font-size: 14px;
}
</style>
