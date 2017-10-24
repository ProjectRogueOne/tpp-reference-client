import Vue from 'vue';
import BalanceBooked from '@/components/BalanceBooked';
import balanceData from './BalanceData';

const balanceText = (balances) => {
  const Constructor = Vue.extend(BalanceBooked);
  const vm = new Constructor({ propsData: { balances } }).$mount();
  return vm.$el.textContent;
};

const singleBalance = (amount, type, direction = 'Credit') => balanceText([
  balanceData(amount, type, direction),
]);

const doubleBalance = (amount, type, datetime, amount2, type2, datetime2) => balanceText([
  balanceData(amount, type, 'Credit', datetime),
  balanceData(amount2, type2, 'Credit', datetime2),
]);

describe('BalanceBooked.vue with no booked balance', () => {
  it('renders blank', () => expect(balanceText([])).to.equal(''));
});

describe('BalanceBooked.vue with single balance that is not a booked balance', () => {
  it('renders blank', () => {
    expect(singleBalance(22290, 'Expected')).to.equal('');
    expect(singleBalance(22290, 'ForwardAvailable')).to.equal('');
    expect(singleBalance(22290, 'Information')).to.equal('');
    expect(singleBalance(22290, 'InterimAvailable')).to.equal('');
    expect(singleBalance(22290, 'OpeningAvailable')).to.equal('');
    expect(singleBalance(22290, 'ClosingAvailable')).to.equal('');
  });
});

describe('BalanceBooked.vue with one booked credit balance', () => {
  it('renders amount', () => {
    expect(singleBalance(22290, 'ClosingBooked')).to.equal('£22,290.00');
    expect(singleBalance(22290, 'InterimBooked')).to.equal('£22,290.00');
    expect(singleBalance(22290, 'OpeningBooked')).to.equal('£22,290.00');
    expect(singleBalance(22290, 'PreviouslyClosedBooked')).to.equal('£22,290.00');
  });
});

describe('BalanceBooked.vue with one booked debit balance', () => {
  it('renders amount', () => {
    expect(singleBalance(22290, 'ClosingBooked', 'Debit')).to.equal('-£22,290.00');
    expect(singleBalance(22290, 'InterimBooked', 'Debit')).to.equal('-£22,290.00');
    expect(singleBalance(22290, 'OpeningBooked', 'Debit')).to.equal('-£22,290.00');
    expect(singleBalance(22290, 'PreviouslyClosedBooked', 'Debit')).to.equal('-£22,290.00');
  });
});

describe('BalanceBooked.vue with two booked balances that have different datetimes', () => {
  const earlierDatetime = '2017-04-05T08:43:07+00:00';
  const laterDatetime = '2017-04-05T18:43:07+00:00';

  it('renders most recent datetime balance', () => {
    expect(doubleBalance(
      22290, 'ClosingBooked', earlierDatetime,
      15000, 'OpeningBooked', laterDatetime,
    )).to.equal('£15,000.00');

    expect(doubleBalance(
      22290, 'ClosingBooked', laterDatetime,
      15000, 'OpeningBooked', earlierDatetime,
    )).to.equal('£22,290.00');
  });
});

describe('BalanceBooked.vue with two booked balances that have same datetime', () => {
  const datetime = '2017-04-05T00:00:00+00:00';

  it('renders ClosingBooked if present', () => {
    expect(doubleBalance(
      22290, 'ClosingBooked', datetime,
      15000, 'OpeningBooked', datetime,
    )).to.equal('£22,290.00');

    expect(doubleBalance(
      15000, 'OpeningBooked', datetime,
      22290, 'ClosingBooked', datetime,
    )).to.equal('£22,290.00');
  });

  it('renders InterimBooked if present and ClosingBooked not present', () => {
    expect(doubleBalance(
      22290, 'InterimBooked', datetime,
      15000, 'OpeningBooked', datetime,
    )).to.equal('£22,290.00');

    expect(doubleBalance(
      15000, 'OpeningBooked', datetime,
      22290, 'InterimBooked', datetime,
    )).to.equal('£22,290.00');
  });

  it('renders OpeningBooked if present and ClosingBooked/InterimBooked not present', () => {
    expect(doubleBalance(
      22290, 'OpeningBooked', datetime,
      15000, 'PreviouslyClosedBooked', datetime,
    )).to.equal('£22,290.00');

    expect(doubleBalance(
      15000, 'PreviouslyClosedBooked', datetime,
      22290, 'OpeningBooked', datetime,
    )).to.equal('£22,290.00');
  });

  it('renders PreviouslyClosedBooked if present and other booked types not present', () => {
    expect(doubleBalance(
      22290, 'PreviouslyClosedBooked', datetime,
      15000, 'PreviouslyClosedBooked', datetime,
    )).to.equal('£22,290.00');

    expect(doubleBalance(
      15000, 'PreviouslyClosedBooked', datetime,
      22290, 'PreviouslyClosedBooked', datetime,
    )).to.equal('£15,000.00');
  });
});
