const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  const devServer = 'http://localhost:8080';
  const accountsPath = `${devServer}/accounts`;

  // clear local storage to remove any session tokens
  Given('I am not logged in', () => client
    .execute('window.localStorage.clear();'));

  Given('I am logged in', () => client
    .url(devServer)
    .execute('window.localStorage.clear();') // clear local storage to remove any session tokens
    .waitForElementVisible('button[name=login]', 5000)
    .click('button[name=login]'));

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

  When('I login with invalid credentials', () => client
    .waitForElementVisible('input[name=u]', 5000)
    .clearValue('input[name=u]')
    .setValue('input[name=u]', 'invalid-user')
    .click('button[name=login]'));

  When('I login and server returns 500 error', () => client
    .waitForElementVisible('input[name=u]', 5000)
    .clearValue('input[name=u]')
    .setValue('input[name=u]', 'trigger-error')
    .click('button[name=login]'));

  Then('I see login failure message', () => client
    .waitForElementVisible('.error', 5000)
    .assert.containsText(
      'div.header',
      'Invalid username or password',
    ));

  Then('I see login server error message', () => client
    .waitForElementVisible('.error', 5000)
    .assert.containsText(
      'div.header',
      'We are having issues with our login system',
    ));

  When('I logout', () => client
    .click('button[name=logout]'));

  Then('I see Accounts page', () => client
    // .url(accountsPath)
    // .pause(20000)
    .waitForElementVisible('#accounts', 5000)
    .assert.containsText(
      'h1',
      'Accounts',
    ));

  Then('I see Account balance', () => client
    .waitForElementVisible('.account', 5000)
    .waitForElementVisible('.balance', 5000)
    .assert.containsText(
      '.balance',
      '1230.00 GBP',
    ));
});
