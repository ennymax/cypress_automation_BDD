require('./../login/login.js')
var { Given, When, Then, DataTable } = require('@badeball/cypress-cucumber-preprocessor');
import BasePage from './../base/BasePage.js';
import { generateRandomUser, dates } from '../../userData';
const newUser = generateRandomUser();
const mailCategory = 'samplemailCategory';
const mailSender = 'examplemailSender';
const mailCarrier = 'examplemailcarrier';
const outgoingMailType = 'exampleofOutgoingmailType';
const brandName = 'exampleBrand';
const mailReciever = 'exampleMailReciever';
const incomingMailType = 'exampleofIncomingmailType';

export default class createMail {
    elements = {
        mailBtn: () => cy.get('#mailLink > .side-menu__label'),
        newMailBtn: () => cy.get('.d-block > .btn'),
        senderName: () => cy.get('#senderName'),

        saveBtn: () => cy.get('#saveMail'),
        caseNumberField: () => cy.get('#caseNumberMail'),
        trackingNumber: () => cy.get('#trackingId'),
        mailRecieptDate: () => cy.get('#receivedDate'),
        sendToDesignationBranchOfficer: () => cy.get('#sentToOzonePark'),
        sendReviewLinkToClient: () => cy.get('#isReviewLinkSentForMail'),
        mailReciever: () => cy.get('#receiverName'),

        nextSteps: () => cy.get('#nextStep'),
        description: () => cy.get('#fileDescription'),
        dueDate: () => cy.get('#dueDate'),
        attachFileToMail: () => cy.get('input[type="file"]'),
        successMessage: () => cy.get('#successMsg'),
        tableID: () => cy.get('table#MailTable'),
        cancelMail: () => cy.xpath('//button[@data-bs-dismiss="modal"][contains(.,"Cancel")]'),
        paymentCheck: () => cy.get('#paymentChecked'),
        mailNumber: () => cy.get('#mailNumber'),
        mailSentDate: () => cy.get('#sendDate'),

        allMailTab: () => cy.get('#allevents-tab'),
        incomingMailTab: () => cy.get('#incoming-tab'),
        outgoingMailTab: () => cy.get('#outgoing-tab'),
        unclaimedMailTab: () => cy.xpath('//a[contains(@id,"unclaimed-tab")]'),

        caseNumberErrorDesc: () => cy.get('#caseNbrErrDsp'),
        trackingNumberErrorDesc: () => cy.get(':nth-child(9) > .form-group > .asterisk'),
        senderNameErrorDesc: () => cy.get(':nth-child(10) > .form-group > .asterisk'),
        incomingMailTypeErrorDesc: () => cy.get(':nth-child(12) > .form-group > .asterisk'),
        mailCarrierErrorDesc: () => cy.get(':nth-child(14) > .form-group > .asterisk'),
        mailRecieptDateErrorDesc: () => cy.get(':nth-child(15) > .form-group > .errorMessage'),
        recipientErrorDesc: () => cy.get(':nth-child(17) > .form-group > .asterisk'),
        branchErrorDesc: () => cy.get(':nth-child(19) > .form-group > .asterisk'),
        nextStepErrorDesc: () => cy.get(':nth-child(25) > .form-group > .asterisk'),
        duesDateErrorDesc: () => cy.get(':nth-child(26) > .form-group > .errorMessage'),
        descriptionErrorDesc: () => cy.get(':nth-child(27) > .form-group > .asterisk'),

        mailCategoryContainer: () => '#select2-mailCategory-container',
        inputSearchableContainer: () => '.select2-dropdown > .select2-search > .select2-search__field',
        outgoingTypeContainer: () => '#select2-outgoingMailType-container',
        mailSenderContainer: () => '#select2-sent-container',
        mailRecipientContainer: () => '#select2-receivedForuserId-container',
        branchContainer: () => '#select2-receivedForLocationbranchId-container',
        branchCorrierContainer: () => '#select2-mailType-container',
        incomingMailTypeContainer: () => '#select2-incomingMailType-container',
        mailCarrierContainer: () => '#select2-mailType-container',

    };


    mailNumberChecker() {
        this.elements.mailNumber()
            .scrollIntoView().should('be.visible')
            .invoke('val')
            .then((value) => {
                // Parse the value as an integer
                const num = parseInt(value, 10);
                expect(num).to.be.a('number').and.to.be.greaterThan(0);
            });
        return this;
    }

    paymentChecker() {
        this.elements.paymentCheck()
            .should('not.be.checked')
            .check()
            .should('be.checked');
        return this;
    }

    VerifyAllErrorMessageAreDisplayed() {
        this.elements.incomingMailTypeErrorDesc().should('be.visible');
        this.elements.trackingNumberErrorDesc().should('be.visible');
        this.elements.senderNameErrorDesc().should('be.visible');
        this.elements.mailCarrierErrorDesc().should('be.visible');
        this.elements.mailRecieptDateErrorDesc().should('be.visible');
        this.elements.recipientErrorDesc().should('be.visible');
        this.elements.branchErrorDesc().should('be.visible');
        this.elements.nextStepErrorDesc().should('be.visible');
        this.elements.duesDateErrorDesc().should('be.visible');
        this.elements.descriptionErrorDesc().should('be.visible');
        return this;
    }


    VerifyIncomingMailFirstColumn() {
        this.elements.incomingMailTab().should('be.visible').should('not.be.disabled').click();
        this.VerifyAllMailFirstColumn();
        return this;
    }

    VerifyOutgoingMailFirstColumn() {
        this.elements.outgoingMailTab().should('be.visible').should('not.be.disabled').click();
        this.VerifyAllMailFirstColumn();
        return this;
    }


    VerifyAllMailFirstColumn() {
        this.elements.tableID().each(($row) => {
            cy.wrap($row).find('td').eq(0).should('not.be.empty');
        });
        return this;
    }

    verifyMailDetails(caseId, maildescription, mailtrackNum) {
        this.elements.caseNumberField()
            .should('not.be.disabled')
            .should('have.value', caseId);

        this.elements.description()
            .should('be.visible')
            .should('not.be.disabled')
            .should('have.value', maildescription);

        this.elements.trackingNumber()
            .should('be.visible')
            .should('not.be.disabled')
            .should('have.value', mailtrackNum);
        return this;
    }

    verifyMailDataIsNotDisplayed(mailcategory, maildescription, mailtrackNum) {
        this.elements.tableID().first().within(() => {
            cy.get('td').eq(1).should('not.contain.text', mailcategory);
            cy.get('td').eq(2).should('not.contain.text', maildescription);
            cy.get('td').eq(3).should('not.contain.text', mailtrackNum);
        });
        return this;
    }
    caseNumberErrorMsg() {
        this.elements.caseNumberErrorDesc()
        .should('have.text', 'Case Number not  exists');
        return this;
    }
    verifySuccessMsg() {
        this.elements.successMessage()
        .should('have.text', 'Mail added successfully. Please note that a copy of the mail documents are available on Uploaded Files.');
        return this;
    }

    fileUpload(path) {
        this.elements.attachFileToMail().selectFile(path, { force: true }, { action: 'drag-drop' })
        return this;
    }
    enterNextSteps(step) {
        this.elements.nextSteps()
        .should('be.visible')
        .should('not.be.disabled').clear().type(step);
        return this;
    }

    enterDescription(description) {
        this.elements.description()
        .should('not.be.disabled').clear().type(description, { delay: 0 });
        return this;
    }

    enterDueDate(date) {
        this.elements.dueDate()
            .should('not.be.disabled')
            .clear()
            .type(date)
            .type('{enter}');
        return this;
    }

    enterMailSentDate(date) {
        this.elements.mailSentDate()
            .should('not.be.disabled')
            .clear()
            .type(date)
            .type('{enter}');
        return this;
    }

    enterMailRecieptDate(date) {
        this.elements.mailRecieptDate()
            .should('not.be.disabled')
            .clear()
            .type(date)
            .type('{enter}');
        return this;
    }

    outGoingmailReciever(outgoingMailReciever) {
        this.elements.mailReciever()
            .should('not.be.disabled')
            .clear()
            .type(outgoingMailReciever)
        return this;
    }

    clickMailMenu() {
        this.elements.mailBtn().should('not.be.disabled').click();
        basepage.awaitLoader();
        return this;
    }


    cancelMailCreation() {
        this.elements.cancelMail().should('not.be.disabled').click();
        basepage.awaitLoader();
        return this;
    }
    SendReviewLinkToClient() {
        this.elements.sendReviewLinkToClient()
            .should('not.be.checked')
            .check()
            .should('be.checked');
        return this;
    }


    SendToDesignationBranchOfficer() {
        this.elements.sendToDesignationBranchOfficer()
            .should('not.be.checked')
            .check()
            .should('be.checked');
        return this;
    }
    addNewMail() {
        this.elements.newMailBtn().should('not.be.disabled').click();
        basepage.awaitLoader();
        return this;
    }
    enterSenderName(name) {
        this.elements.senderName().should('not.be.disabled').clear().type(name);
        return this;
    }

    trackingNumber(trackingnumber) {
        this.elements.trackingNumber().should('not.be.disabled').clear().type(trackingnumber, { force: true });
        return this;
    }
    enterCaseNumber(caseNumber) {
        this.elements.caseNumberField().should('not.be.disabled').clear().type(caseNumber);
        return this;
    }

    clickSaveButton() {
        this.elements.saveBtn().should('not.be.disabled').click();
        basepage.awaitLoader();
        return this;
    }

    selectMailRecipient() {
        //Recipient
        cy.advancedClick(
            this.elements.mailRecipientContainer(),
            this.elements.inputSearchableContainer(), mailReciever,
            2
        );
        return this;
    }

    selectMailcarrier() {
        //Mail carrier
        cy.advancedClick(
            this.elements.mailCarrierContainer(),
            this.elements.inputSearchableContainer(), mailCarrier,
            2
        );
        return this;
    }

    selectMailSender() {
        //Mail sender
        cy.advancedClick(
            this.elements.mailSenderContainer(),
            this.elements.inputSearchableContainer(), mailSender,
            2
        );
        return this;
    }

    selectIncomingMailType() {
        //Incoming Mail type
        cy.advancedClick(
            this.elements.incomingMailTypeContainer(),
            this.elements.inputSearchableContainer(), incomingMailType,
            2
        );
        return this;
    }

    selectOutgoingMailType() {
        //outgoing Mail type
        cy.advancedClick(
            this.elements.outgoingTypeContainer(),
            this.elements.inputSearchableContainer(), outgoingMailType,
            2
        );
        return this;
    }

    selectABranch() {
        //Branch
        cy.advancedClick(
            this.elements.branchContainer(),
            this.elements.inputSearchableContainer(), brandName,
            2
        );
        return this;
    }

    selectMailCategory(index) {
        //select Mail Category
        cy.advancedClick(
            this.elements.mailCategoryContainer(),
            this.elements.inputSearchableContainer(), mailCategory,
            index
        );
        return this;
    }


    creatOutgoingMail(mailreciever, caseNumber, trackingNumber, mailRecieptDate, description) {
        this.selectMailCategory(2)
            .paymentChecker()
            .mailNumberChecker()
            .outGoingmailReciever(mailreciever)
            .selectMailcarrier()
            .selectMailSender()
            .enterCaseNumber(caseNumber)
            .trackingNumber(trackingNumber)
            .selectOutgoingMailType()
            .enterMailSentDate(mailRecieptDate)
            .selectABranch()
            .fileUpload('cypress/fixtures/files/retainerForm.pdf')
            .enterNextSteps('Reach out After Recieving the Mail')
            .enterDescription(description);
        return this;
    }

    creatIncomingMail(sendersName, caseNumber, trackingNumber, mailRecieptDate, dueDate, description) {
        this.enterSenderName(sendersName)
            .enterCaseNumber(caseNumber)
            .trackingNumber(trackingNumber)
            .selectMailcarrier()
            .mailNumberChecker()
            .selectABranch()
            .selectMailRecipient()
            .selectIncomingMailType()
            .enterMailRecieptDate(mailRecieptDate)
            .SendReviewLinkToClient()
            .SendToDesignationBranchOfficer()
            .fileUpload('cypress/fixtures/files/retainerForm.pdf')
            .enterNextSteps('Reach out After Recieving the Mail')
            .enterDescription(description)
            .enterDueDate(dueDate)
        return this;
    }

    updateIncomingMail(sendersName, caseNumber, trackingNumber, mailRecieptDate, dueDate, description) {
        this.enterSenderName(sendersName)
            .mailNumberChecker()
            .selectMailRecipient()
            .selectMailcarrier()
            .enterCaseNumber(caseNumber)
            .trackingNumber(trackingNumber)
            .selectIncomingMailType()
            .enterMailRecieptDate(mailRecieptDate)
            .selectABranch()
            .enterNextSteps('Reach out After Recieving the Mail')
            .enterDescription(description)
            .enterDueDate(dueDate)
        return this;
    }


    updateOutgoingMail(mailreciever, caseNumber, trackingNumber, mailRecieptDate, description) {
        this.outGoingmailReciever(mailreciever)
            .selectMailcarrier()
            .selectMailSender()
            .enterCaseNumber(caseNumber)
            .trackingNumber(trackingNumber)
            .selectOutgoingMailType()
            .enterMailSentDate(mailRecieptDate)
            .selectABranch()
            .enterNextSteps('Reach out After Recieving the Mail')
            .enterDescription(description);
        return this;
    }
}

const creatmail = new createMail();
const basepage = new BasePage();

Given(`the user is on the mail page`, () => {
    cy.title().should('eq', 'MyLS - Mail')
});

When(`the user clicks on the {string} button from the dashboard`, (arg0) => {
    creatmail.clickMailMenu();
});


Then(`the user should see the newly created mail under the correct category`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`the user clicks on the {string} button from the mailing page`, (arg0) => {
    creatmail.addNewMail();
});

When(`the user fills out the mail creation form with valid details as Incoming Mail`, () => {
    creatmail.creatIncomingMail(newUser.fullName, basepage.caseID, basepage.trackNum, basepage.date1, basepage.date2, basepage.desc)
    creatmail.verifyMailDetails(basepage.caseID, basepage.desc, basepage.trackNum);
});

When(`the user fills out the mail creation form with icomplete CaseID as Incoming Mail`, () => {
    creatmail.creatIncomingMail(newUser.fullName, '12345678', basepage.trackNum, basepage.date1, basepage.date2, basepage.desc)
});

When(`the user clicks on the Cancel button on the mailing form`, () => {
    creatmail.cancelMailCreation()
});

Then(`the mail modal should close`, () => {
    creatmail.elements.newMailBtn().should('be.visible');
});

Then(`the usser shoud be able to click on the {string} button again`, (arg0) => {
    creatmail.addNewMail();
});

When(`the user clicks on the {string} button on the mailing form`, (arg0) => {
    creatmail.clickSaveButton()
});

Then(`the user should see a success message {string}`, (arg0) => {
    creatmail.verifySuccessMsg()
});

Then(`the mail should be sent to the client successfully`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the new mail should be visible under the correct mail category`, () => {
    creatmail.elements.tableID().first().within(() => {
        cy.get('td').eq(0).should('contain.text', basepage.caseID);
        cy.get('td').eq(3).should('contain.text', basepage.trackNum);
    });
});

Then(`the new mail should be visible under the correct mail category as outgoing mail`, () => {
    creatmail.elements.tableID().first().within(() => {
        cy.get('td').eq(0).should('contain.text', basepage.caseID);
        cy.get('td').eq(3).should('contain.text', basepage.trackNum);
    });
});

Then(`the mail count should increase by one under the respective mail category`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the user should remain on the form Page`, () => {
    creatmail.elements.dueDate().should('exist');
    creatmail.elements.description().should('exist');
    creatmail.elements.sendReviewLinkToClient().should('exist');
    creatmail.elements.senderName().should('exist');
});

Then(`Error messages for the mandatory fields should be seen`, () => {
    creatmail.caseNumberErrorMsg()
});

Then(`All the mandatory fields should be displayed`, () => {
    creatmail.VerifyAllErrorMessageAreDisplayed()
});

When(`the user fills out the mail creation form with valid details as Outgoing Mail`, () => {
    creatmail.creatOutgoingMail(basepage.outgoingemail, basepage.caseID, basepage.trackNum, basepage.date2, basepage.desc)
});