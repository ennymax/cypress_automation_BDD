var { Given, And, When, Then, DataTable } = require('@badeball/cypress-cucumber-preprocessor');
const BasePage = require('./../base/BasePage.js');

export default class login {

  elements = {
    logoutButton: () => cy.get('.pull-right > .btn'),
    passwordField: () => cy.get('#j_password'),
    signInButton: () => cy.get(':nth-child(6) > .btn'),
    usernameField: () => cy.get('#j_username'),
    notificationPopUp: () => cy.get('.position-relative > :nth-child(2) > .fw-bold'),
    userErrorMessage: () => cy.get('#userErrorMessageDIV > .fs-12'),
  };


  enterPassword(password) {
    this.elements.passwordField().should('not.be.disabled').type(password);
    return this;
  }

  enterUsername(username) {
    this.elements.usernameField().should('not.be.disabled').type(username);
    return this;
  }

  clickSignInButton() {
    this.elements.signInButton().click();
    return this;
  }

  loginAs(username, password) {
    this.enterUsername(username)
      .enterPassword(password);
  }
}

const loginpage = new login();
const basepage = new BasePage();

Given(`the user is on the login page`, () => {
  basepage.visit();
  cy.title().should('eq', 'MyLS - Immigration Speed')
});

When(`the user enters a valid username and _password`, () => {
  loginpage.loginAs(basepage.username, basepage.password)
});

When(`the user clicks the Sign in _button`, () => {
  loginpage.clickSignInButton()
});

Then(`the user should be redirected to the _dashboard`, () => {
  basepage.awaitLoader();
  cy.title().should('eq', 'MyLS - Dashboard');});

Then(`the user should see a notification pop _up`, () => {
  loginpage.elements.notificationPopUp().should('be.visible').and('contain', 'Priority\n\t\t\t\t\t\tAlert! Check Out This week’s for your attention list!');
});

Then(`the user enters an invalid username`, () => {
  loginpage.enterUsername('codingmeet')
});

Given(`the user enters a valid password`, () => {
  loginpage.enterPassword(basepage.password)
});

Then(`the user should see an error message`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the user should remain on the login page`, () => {
  cy.title().should('eq', 'MyLS - Immigration Speed');
});

Then(`the user enters an invalid password`, () => {
  loginpage.enterPassword('Rainbow')
});

Given(`the user enters a valid username`, () => {
  loginpage.enterUsername(basepage.password)
});

Then(`the user leaves the username and password fields empty`, () => {
  loginpage.loginAs(' ', ' ')
});

Then(`the user should see a validation error message`, () => {
  loginpage.elements.userErrorMessage().should('be.visible');
});