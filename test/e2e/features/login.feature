Feature: Login to see accounts

Scenario: Logging in and out

  Given I am not logged in
  When I open homepage
  Then I see Login page
  When I login
  And I select an ASPSP
  Then I see Redirection page
  When I wait some time
  Then I see Accounts page
  And I see Account balance
  When I logout
  Then I see Login page
  When I visit accounts path
  Then I see Login page

Scenario: Redirected to login when not logged in

  Given I am not logged in
  When I visit accounts path
  Then I see Login page

Scenario: Logging in and server returns 500 error

  Given I am not logged in
  And I open homepage
  When I login and server returns 500 error
  Then I see Login page
  And I see login server error message

Scenario: Logging in with invalid credentials

  Given I am not logged in
  And I open homepage
  When I login with invalid credentials
  Then I see Login page
  And I see login failure message

Scenario: Logging in and redirect to aspsp selection page if aspsp not selected on accounts page

  Given I am not logged in
  When I open homepage
  Then I see Login page
  When I login
  And I select an ASPSP
  Then I see Redirection page
  When I wait some time
  Then I see Accounts page
  And I see Account balance
  When System removes selected aspsp from LocalStore 
  And I reload page
  Then I see ASPSP selection page
  When I logout
  Then I see Login page
  When I visit accounts path
  Then I see Login page

Scenario: Logging in and redirect to aspsp selection page if aspsp not selected on redirection page

  Given I am not logged in
  When I open homepage
  Then I see Login page
  When I login
  And I select an ASPSP
  Then I see Redirection page
  When System removes selected aspsp from LocalStore 
  And I reload page
  Then I see ASPSP selection page
  When I logout
  Then I see Login page
  When I visit accounts path
  Then I see Login page