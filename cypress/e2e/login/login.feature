Feature: Login into MYLS

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters a valid username and _password
    And the user clicks the Sign in _button
    Then the user should be redirected to the _dashboard
    And the user should see a notification pop _up


  Scenario: Unsuccessful login with invalid username
    Given the user is on the login page
    When the user enters an invalid username
    And the user enters a valid password
    And the user clicks the Sign in _button
    Then the user should see an error message
    And the user should remain on the login page
 
  
  Scenario: Unsuccessful login with invalid password
    Given the user is on the login page
    When the user enters an invalid password
    And the user enters a valid username
    And the user clicks the Sign in _button
    Then the user should see an error message
    And the user should remain on the login page
  

  Scenario: Unsuccessful login with empty credentials
    Given the user is on the login page
    When the user leaves the username and password fields empty
    And the user clicks the Sign in _button
    Then the user should see a validation error message
    And the user should remain on the login page
