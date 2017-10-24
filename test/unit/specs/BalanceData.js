const balanceData = (amount, type, direction, datetime = '2017-04-05T10:43:07+00:00') => ({
  Amount: {
    Amount: amount,
    Currency: 'GBP',
  },
  CreditDebitIndicator: direction,
  Type: type,
  DateTime: datetime,
});

export default balanceData;
