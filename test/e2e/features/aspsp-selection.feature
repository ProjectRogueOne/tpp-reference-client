Feature: Select ASPSP from list in order to add accounts

Scenario: Select from list of ASPSPs in order to add accounts

  Given I am logged in
  When I select an ASPSP
  Then I see Accounts page
