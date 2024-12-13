// Handle uncaught exception
const path = require('path');
Cypress.on('uncaught:exception', (error, runnable) => {
  return false;
});
