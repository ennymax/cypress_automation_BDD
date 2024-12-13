
var { Given, When, Then, DataTable } = require('@badeball/cypress-cucumber-preprocessor');
import { generateRandomUser, dates } from '../../userData';
const newUser = generateRandomUser();

export default class downloadMail {
    elements = {
        downloadBtn: () => cy.xpath('(//a[@class="dropdown-item fw-normal"][contains(.,"Download")])[1]'),
    };

    clickOnDownloadButton() {
        this.elements.downloadBtn().click({ force: true });
        return this;
    }
}

const downloadmail = new downloadMail();
When(`the user clicks on the download button`, () => {
    downloadmail.clickOnDownloadButton()
});

Then(`the file should be downloaded successfully`, () => {
    cy.task('checkFolderIsNotEmpty','cypress/downloads', { timeout: 15000 })
  .then(isNotEmpty => {
    expect(isNotEmpty).to.be.true;
});
});