import BasePage from './../base/BasePage.js';
import createMail from './createMail.js';
var { Given, When, Then, DataTable } = require('@badeball/cypress-cucumber-preprocessor');
const basepage = new BasePage();
const createmail = new createMail();
const branchName = 'exampleBrand';
const caseid = basepage.caseID + '';//converting the caseID to string

export default class filterMail {
    elements = {
        caseNumberSearch: () => cy.get('#caseNumberSearch'),
        searchBtn: () => cy.get('#searchMail'),
        dateFom: () => cy.get('#startdate'),
        dateTo: () => cy.get('#enddate'),
        filterBranchContainer: () => '#select2-branch-container'
    };

    FilterByBranch() {
        cy.advancedClick(
            this.elements.filterBranchContainer(),
            createmail.elements.inputSearchableContainer(), branchName, 3);
        return this;
    }

    enterCaseNumber(caseNumber) {
        this.elements
            .caseNumberSearch()
            .should('not.be.disabled')
            .should('be.visible')
            .clear().
            type(caseNumber);
        return this;
    }

    enterDateFrom(datefrom) {
        this.elements
            .dateFom()
            .should('not.be.disabled')
            .should('be.visible')
            .clear()
            .type(datefrom)
            .type('{enter}');
        return this;
    }

    enterDateTo(dateto) {
        this.elements
            .dateTo()
            .should('not.be.disabled')
            .should('be.visible')
            .clear()
            .type(dateto)
            .type('{enter}');
        return this;
    }

    clickOnSearchBtn() {
        this.elements
            .searchBtn()
            .scrollIntoView()
            .should('not.be.disabled')
            .should('be.visible')
            .click({ force: true });
        return this;
    }

    verifyDateResult(dateOfYesterday, todayDate) {
        const xpathLocator = `//td[contains(.,'${dateOfYesterday}')]`;
        cy.validateDateRangeInXPath(
            xpathLocator,
            dateOfYesterday,
            todayDate);
        return this;
    }
}

const filtermail = new filterMail();

Given(`the user clicks on the Incoming mail`, () => {
    createmail.elements.incomingMailTab().should('be.visible').click();
});

Given(`The user clicks on Outgoing mail`, () => {
    createmail.elements.outgoingMailTab().should('be.visible').click();
});

Given("The user clicks on Unclaimned mail", function () {
    createmail.elements.unclaimedMailTab().should('be.visible').realClick();
});

Then(`the user should see All mail under Incoming mail`, () => {
    createmail.VerifyAllMailFirstColumn();
});

Then(`the user should see all the  created mail under outgoing mail`, () => {
    createmail.VerifyAllMailFirstColumn();
});

Then(`the user should see all available mailing categories`, () => {
    createmail.VerifyAllMailFirstColumn();
});

When(`User search for a mail by Case Number`, () => {
    filtermail.enterCaseNumber(basepage.caseID)
});

When(`user clicks on the search button`, () => {
    filtermail.clickOnSearchBtn()
});

Then(`the user should see a list of cases with the same case Number`, () => {
    cy.verifyAllElementsSameInColumn(`//td[contains(.,'${basepage.caseID}')]`, caseid);
});

When(`User search for a mail by Date To`, (arg0) => {
    filtermail.enterDateTo(basepage.date2)
});

When(`When User search for a mail by Date From`, (arg0) => {
    filtermail.enterDateFrom(basepage.date1)
});

When(`User search for a mail by Branch Name`, (arg0) => {
    filtermail.FilterByBranch()
});

Then(`the user should see a list of cases with the same Same Date`, () => {
    filtermail.verifyDateResult(basepage.date1, basepage.date3)
});

Then(`the user should see a list of cases with the Same Branch Name`, () => {
    const storedValue = Cypress.env(branchName);
    cy.verifyAllElementsSameInColumn(`//td[contains(.,'${storedValue}')]`, storedValue);
});

When(`User search for a mail by Case Number, Date From, Date To, Branch Name`, () => {
    filtermail
        .enterCaseNumber(basepage.caseID)
        .enterDateFrom(basepage.date1)
        .enterDateTo(basepage.date2)
        .FilterByBranch()
});

Then(`the user should see a list of cases with the same User search for a mail by Case Number, Date From, Date To, Branch Name`, () => {
    cy.verifyAllElementsSameInColumn(`//td[contains(.,'${basepage.caseID}')]`, caseid);
    filtermail.verifyDateResult(basepage.date1, basepage.date3);

});