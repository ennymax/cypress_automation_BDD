Feature: As a user, i should be able to create a Mail Case

    #including creating a All Mail, Search Mail, Incoming Mail, Outgoing Mail, Claimed Mail

    Background: Successful login with valid credentials
        Given the user is on the login page
        When the user enters a valid username and _password
        And the user clicks the Sign in _button
        Then the user should be redirected to the _dashboard
        And the user should see a notification pop _up
        And the user clicks on the "Mail" button from the dashboard

    @Regression @Sanity
    Scenario: Users should be able to close the Mail creation form
        Given the user is on the mail page
        When the user clicks on the "CREATE NEW MAIL" button from the mailing page
        And the user fills out the mail creation form with valid details as Incoming Mail
        And the user clicks on the Cancel button on the mailing form
        Then the mail modal should close
        And the user should see all available mailing categories

    @Regression @Sanity
    Scenario: Users should be able to create a new Incoming Mail successfully when all the fields are completed
        Given the user is on the mail page
        When the user clicks on the "CREATE NEW MAIL" button from the mailing page
        And the user fills out the mail creation form with valid details as Incoming Mail
        And the user clicks on the "Submit" button on the mailing form
        Then the user should see a success message "Mail created successfully"
        And the mail should be sent to the client successfully
        And the new mail should be visible under the correct mail category
        And the mail count should increase by one under the respective mail category


    @Regression @Sanity
    Scenario: Users should not be able to create a new Incoming Mail when caseID is not valid
        Given the user is on the mail page
        When the user clicks on the "CREATE NEW MAIL" button from the mailing page
        And the user fills out the mail creation form with icomplete CaseID as Incoming Mail
        And the user clicks on the "Submit" button on the mailing form
        Then the user should remain on the form Page
        And Error messages for the mandatory fields should be seen
        And the user clicks on the Cancel button on the mailing form
        And the mail modal should close



    @Regression @Sanity
    Scenario: Users should not be able to create a new Incoming Mail when all the mandatory fields are not completed
        Given the user is on the mail page
        When the user clicks on the "CREATE NEW MAIL" button from the mailing page
        And the user clicks on the "Submit" button on the mailing form
        Then the user should remain on the form Page
        And All the mandatory fields should be displayed
        And the user clicks on the Cancel button on the mailing form
        And the mail modal should close


    @Regression @Sanity
    Scenario: Users should be able to create a new Outgoing Mail successfully
        Given the user is on the mail page
        When the user clicks on the "CREATE NEW MAIL" button from the mailing page
        And the user fills out the mail creation form with valid details as Outgoing Mail
        And the user clicks on the "Submit" button on the mailing form
        Then the user should see a success message "Mail created successfully"
        And the mail should be sent to the client successfully
        And the new mail should be visible under the correct mail category as outgoing mail
        And the mail count should increase by one under the respective mail category

