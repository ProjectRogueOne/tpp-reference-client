const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  Then('I see ASPSP selection page', () => client
    .waitForElementVisible('#aspsp-selection', 5000)
    .assert.containsText(
      'h1',
      'Select preferred ASPSP account',
    ));

  When('I select an ASPSP', () => { // eslint-disable-line
    // const waitTill = new Date(new Date().getTime() + 100);
    // while (waitTill > new Date()) {
    //   // wait
    // }
    return client
      .waitForElementVisible('.aspsp-select', 5000)
      .useXpath().click("//*[contains(text(), 'AAA Example Bank')]")
      .waitForElementVisible('#accounts', 5000);
    // .assert.containsText(
    //   'h1',
    //   'Accounts',
    // );
  });
});
