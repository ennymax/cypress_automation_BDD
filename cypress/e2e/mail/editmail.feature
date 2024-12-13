Feature: As a user, i should be able to Edit a mail

    Background: users should have created a new mail
        Given the user is on the login page
        And the user enters a valid username and _password
        And the user clicks the Sign in _button
        And the user should be redirected to the _dashboard
        And the user should see a notification pop _up
        And the user clicks on the "Mail" button from the dashboard


    @Regression @Sanity
    Scenario: Users should be able to edit an Incomingmail
        Given the user is on the mail page
        When the user clicks on the Incoming mail
        And the user clicks on the action button
        And the user clicks on the edit button
        And the user edit the mail form with valid details as Incoming Mail
        And the user clicks on the "Submit" button on the mailing form
        Then the user should see a success message "Mail created successfully"
    #And the new mail should be visible under the correct mail category

    @Regression @Sanity 
    Scenario: Users should be able to edit an outgoing mail
        Given the user is on the mail page
        When The user clicks on Outgoing mail
        And the user clicks on the action button
        And the user clicks on the edit button
        And the user edit the mail as outgoing Mail
        And the user clicks on the "Submit" button on the mailing form
        Then the user should see a success message "Mail created successfully"
    #And the new mail should be visible under the correct mail category as outgoing mail


    @Regression @Sanity 
    Scenario: Users should be able to edit an incoming mail to Outgoing mail
        Given the user is on the mail page
        When the user clicks on the Incoming mail
        And the user clicks on the action button
        And the user clicks on the edit button
        And the user edit the mail as outgoing Mail
        And the user clicks on the "Submit" button on the mailing form
        Then the user should see a success message "Mail created successfully"
    #And the new mail should be visible under the correct mail category as outgoing mail


    @Regression @Sanity
    Scenario: Users should be able to edit an Outcoming mail to Incoming mail
        Given the user is on the mail page
        When The user clicks on Outgoing mail
        And the user clicks on the action button
        And the user clicks on the edit button
        And the user edit the mail as incoming mail
        And the user clicks on the "Submit" button on the mailing form
        Then the user should see a success message "Mail created successfully"




