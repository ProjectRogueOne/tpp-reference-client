const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  When('I select an ASPSP', () => client
    .waitForElementVisible('#aspsp-selection', 5000)
    .assert.containsText(
      'h1',
      'Select preferred ASPSP account',
    ));
});
