Feature: Users should be able to filter mail by
    #Date To, Date from, Case Number, Branch

    Background: Successful login with valid credentials
        Given the user is on the login page
        When the user enters a valid username and _password
        And the user clicks the Sign in _button
        Then the user should be redirected to the _dashboard
        And the user should see a notification pop _up
        And the user clicks on the "Mail" button from the dashboard

    @Regression @Sanity
    Scenario: Users should be able to see all Incoming Mail categories and the mailling table
        Given the user is on the mail page
        And the user clicks on the Incoming mail
        Then the user should see All mail under Incoming mail


    @Regression @Sanity
    Scenario: Users should be able to see all the Outgoing mail categories and the mailling table
        Given the user is on the mail page
        And The user clicks on Outgoing mail
        Then the user should see all the  created mail under outgoing mail


    @Regression @Sanity
    Scenario: Users should be able to Filter All mails by Case Number
        Given the user is on the mail page
        When User search for a mail by Case Number
        And user clicks on the search button
        Then the user should see a list of cases with the same case Number

    @Regression @Sanity
    Scenario: Users should be able to Filter All mails by 'Branch Name'
        Given the user is on the mail page
        When User search for a mail by Branch Name
        And user clicks on the search button
        Then the user should see a list of cases with the Same Branch Name

    @Regression @Sanity
    Scenario: Users should be able to Filter All mails by 'Case Number', 'Branch Name', 'Date From', 'Date From',
        Given the user is on the mail page
        When User search for a mail by Case Number, Date From, Date To, Branch Name
        And user clicks on the search button
        Then the user should see a list of cases with the same User search for a mail by Case Number, Date From, Date To, Branch Name

    @Regression @Sanity
    Scenario: Users should be able to Filter Incoming Mail by 'Case Number', 'Branch Name', 'Date From', 'Date From',
        Given the user is on the mail page
        And the user clicks on the Incoming mail
        When User search for a mail by Case Number, Date From, Date To, Branch Name
        And user clicks on the search button
        Then the user should see a list of cases with the same User search for a mail by Case Number, Date From, Date To, Branch Name

    @Regression @Sanity
    Scenario: Users should be able to Filter Outgoing Mail by 'Case Number', 'Branch Name', 'Date From', 'Date From',
        Given the user is on the mail page
        And The user clicks on Outgoing mail
        When User search for a mail by Case Number, Date From, Date To, Branch Name
        And user clicks on the search button
    # Then the user should see a list of cases with the same User search for a mail by Case Number, Date From, Date To, Branch Name

    @Regression @Sanity
    Scenario: Users should be able to see all the uncliamed mail
        Given the user is on the mail page
        And The user clicks on Unclaimned mail
        Then the user should see all the  created mail under outgoing mail