Feature: As a user, i should be able to delete a mail

    Background: users should have created a new mail
        Given the user is on the login page
        And the user enters a valid username and _password
        And the user clicks the Sign in _button
        And the user should be redirected to the _dashboard
        And the user should see a notification pop _up
        And the user clicks on the "Mail" button from the dashboard
      

    @Regression @Sanity
    Scenario: Users should be able to delete a mail
        Given the user is on the mail page
        When the user clicks on the action button
        And the user clicks on the delete button
        And the user clicks on the confirmation button
        Then A notifcation should be displayed for the deleted file
        And the file should not be vissible in the mail table

