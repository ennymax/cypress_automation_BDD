import BasePage from '../base/BasePage.js';
import createMail from './createMail.js';
var { Given, When, Then, DataTable } = require('@badeball/cypress-cucumber-preprocessor');
import { generateRandomUser, dates } from '../../userData';
const newUser = generateRandomUser();

const createmail = new createMail();
const basepage = new BasePage();

export default class editMail {
    elements = {
        editbtn: () => cy.xpath('(//a[@class="dropdown-item fw-normal"][contains(.,"Edit Mail")])[1]'),
    };

    clickOnEditButton() {
        this.elements.editbtn().click({ force: true });
        return this;
    }
}

const editmail = new editMail();
When(`the user clicks on the edit button`, () => {
    editmail.clickOnEditButton()
    basepage.awaitLoader();
});

When(`the user verify the correct details are returned`, () => {
    createmail.verifyMailDetails(basepage.caseID, basepage.desc, basepage.trackNum);
});


When(`the user edit the mail as incoming mail`, () => {
    createmail
    .selectMailCategory(1)
    .updateIncomingMail(newUser.fullName, basepage.caseID, basepage.trackNum, basepage.date1, basepage.date2, basepage.desc);
});


When(`the user edit the mail form with valid details as Incoming Mail`, () => {
    createmail
    .selectMailCategory(1)
    .updateIncomingMail(newUser.fullName, basepage.caseID, basepage.trackNum, basepage.date1, basepage.date2, basepage.desc)
});

When(`the user edit the mail as outgoing Mail`, () => {
    createmail
        .selectMailCategory(2)
        .updateOutgoingMail(basepage.outgoingemail, basepage.caseID, basepage.trackNum, basepage.date2, basepage.desc)
});