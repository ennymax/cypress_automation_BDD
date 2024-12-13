import BasePage from './../base/BasePage.js';
import createMail from './../mail/createMail.js';
var { Given, When, Then, DataTable } = require('@badeball/cypress-cucumber-preprocessor');

const createmail = new createMail();
const basepage = new BasePage();
export default class deleteMail {
    elements = {
        actionbtn: () => cy.xpath('(//iconify-icon[contains(@icon,"pepicons-pop:dots-y")])[1]'),
        deletebtn: () => cy.get('.dropdown-menu-hover-table-first > :nth-child(2) > #deleteLink'),
        confirmdeletebtn: () => cy.get('#deleteMailConfirmModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'),
        deleteMsg: () => cy.get('#deleteMsg'),
    };

    clickOnActionButton() {
        this.elements.actionbtn().realHover('mouse');
        return this;
    }

    clickOnDeleteButton() {
        this.elements.deletebtn().click({ force: true });
        return this;
    }

    confirmDeleteButton() {
        this.elements.confirmdeletebtn().click({ force: true });
        return this;
    }


    verifyDelete() {
        this.elements.deleteMsg().should('have.text', 'Mail Deleted Successfully....!');
        return this;
    }
}

const deletemail = new deleteMail();


When(`the user clicks on the action button`, (arg0) => {
    deletemail.clickOnActionButton()
});

When(`the user clicks on the delete button`, (arg0) => {
    deletemail.clickOnDeleteButton()
});

When(`the user clicks on the confirmation button`, (arg0) => {
    deletemail.confirmDeleteButton()
});

Then(`A notifcation should be displayed for the deleted file`, (arg0) => {
    deletemail.verifyDelete()
});

Then(`the file should not be vissible in the mail table`, (arg0) => {
    createmail.verifyMailDataIsNotDisplayed(basepage.caseID, 'Incoming', basepage.desc, basepage.trackNum);
});