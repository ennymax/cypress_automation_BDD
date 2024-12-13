import { Before, After, BeforeAll, AfterAll } from '@badeball/cypress-cucumber-preprocessor';
import { generateRandomUser, dates } from '../../userData';

const newDate = dates();
const newUser = generateRandomUser();
export default class BasePage {
  constructor() {
    this.baseUrl = Cypress.env("baseURL") || "";
    this.username = Cypress.env("USER_NAME") || "";
    this.password = Cypress.env("PASS_WORD") || "";
  }

  visit() {
    cy.intercept('**').as('pageLoad');
    cy.visit(this.baseUrl);
    cy.wait('@pageLoad'); // Wait for the intercept
    return this;
  }

  awaitLoader() {
    cy.get('#FullLoader').should('not.be.visible');
    return this;
  }
};

Before(() => {
  // Clear cookies and local storage before each scenario
  cy.clearCookies();
  cy.clearLocalStorage();

  //Task to delete the download folder
  cy.task('deleteFolder', 'cypress/downloads');
});
