var { Given, And, When, Then, DataTable } = require('@badeball/cypress-cucumber-preprocessor');
const BasePage = require('../base/BasePage.js');

export default class logoutPage {

  elements = {
    usernameHeader: () => cy.get('p[class="fw-semibold mb-0 lh-1"]'),
    logoutBtn: () => cy.get('ul li a[onclick="logoutModal()"]'),
    confirmLogoutBtn: () => cy.get('button[onclick="logout()"]'),
  }


  logoutUser() {
    this.elements.usernameHeader().should('be.visible').click()
    this.elements.logoutBtn().click()
    this.elements.confirmLogoutBtn().click()
    return this;
  }

  verifyLogout() {
    cy.title().should('eq', 'MyLS - Immigration Speed')
    return this;
  }
}



