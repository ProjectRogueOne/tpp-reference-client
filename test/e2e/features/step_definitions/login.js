const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  const devServer = 'http://localhost:8080';
  const accountsPath = `${devServer}/accounts`;

  // clear local storage to remove any session tokens
  Given('I am not logged in', () => client
    .execute('window.localStorage.clear();'));

  Given('I visit accounts path', () => client
    .url(accountsPath));

  Given(/^I open homepage$/, () => client
    .url(devServer)
    .waitForElementVisible('#app', 5000));

  Then(/^I see Login page$/, () => client
    .waitForElementVisible('#login', 5000)
    .assert.containsText(
      'h1',
      'Login to view balances',
    ).assert.elementPresent('button[name=login]'));

  When('I login', () => client
    .click('button[name=login]'));

  Then('I see Accounts page', () => client
    .waitForElementVisible('#accounts', 5000)
    .assert.containsText(
      'h1',
      'Accounts',
    ));

  Then('I see Account balance', () => client
    .waitForElementVisible('.account', 5000)
    .assert.containsText(
      '.balance',
      '1230.00 GBP',
    ));
});
