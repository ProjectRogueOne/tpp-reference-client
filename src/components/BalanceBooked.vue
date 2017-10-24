<template>
  <span class="balance-booked" v-if="bookedBalance">
    {{ formatAmount(bookedBalance.Amount.Amount, bookedBalance.Amount.Currency) }}
  </span>
</template>

<script>
const groupby = require('lodash.groupby');
const currencyFormatter = require('currency-formatter');

export default {
  name: 'balance-booked',
  props: ['balances'],
  methods: {
    formatAmount(amount, code) {
      return currencyFormatter.format(amount, { code });
    },
    isBookedBalance(balance) {
      switch (balance.Type) {
        case 'ClosingBooked':
        case 'InterimBooked':
        case 'OpeningBooked':
        case 'PreviouslyClosedBooked':
          return true;
        default:
          return false;
      }
    },
    sortDatetimeDescending(balances) {
      balances.sort((a, b) => {
        if (a.DateTime > b.DateTime) return -1;
        if (a.DateTime < b.DateTime) return 1;
        return 0;
      });
    },
    bestMatchWithoutDateTime(list) {
      const byType = groupby(list, b => b.Type);
      if (byType.ClosingBooked) return byType.ClosingBooked[0];
      if (byType.InterimBooked) return byType.InterimBooked[0];
      if (byType.OpeningBooked) return byType.OpeningBooked[0];
      if (byType.PreviouslyClosedBooked) return byType.PreviouslyClosedBooked[0];
      return null;
    },
    bestMatch(booked) {
      this.sortDatetimeDescending(booked);
      const latestDateTime = booked[0].DateTime;
      const byDatetime = groupby(booked, b => b.DateTime);
      const recent = byDatetime[latestDateTime];
      if (recent.length > 1) {
        return this.bestMatchWithoutDateTime(recent);
      }
      return recent[0];
    },
  },
  computed: {
    bookedBalances() {
      return this.balances.filter(this.isBookedBalance);
    },
    bookedBalance() {
      const booked = this.bookedBalances;
      if (booked.length > 0) {
        return this.bestMatch(booked);
      }
      return null;
    },
  },
};
</script>

<style scoped>
.balance-booked {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 26px;
  font-weight: bold;
}
</style>
