const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const { defineConfig } = require("cypress");
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Function to delete a folder and its contents recursively
const deleteFolderRecursive = (folderPath) => {
  try {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        const curPath = path.join(folderPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // Recursively delete subfolders
          deleteFolderRecursive(curPath);
        } else {
          // Delete files
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(folderPath);
    }
  } catch (error) {
    console.error(`Error deleting folder: ${folderPath}`, error);
  }
};

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));

  // Define all tasks within a single on('task', { ... }) call
  on('task', {
    checkFolderIsNotEmpty(folderPath) {
      try {
        const files = fs.readdirSync(folderPath);
        return files.length > 0;
      } catch (error) {
        console.error(`Error checking folder: ${folderPath}`, error);
        return false;
      }
    },
    deleteFolder(folderPath) {
      deleteFolderRecursive(folderPath);
      return null;
    }
  });

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents, // Correct placement of setupNodeEvents function
    env: {
      ...process.env,
    },
    downloadsFolder: "cypress/downloads",
    specPattern: "cypress/e2e/**/*.feature",
    chromeWebSecurity: false,
    defaultCommandTimeout: 30000,
    experimentalStudio: true,
    failOnStatusCode: false,
    pageLoadTimeout: 30000,
    watchForFileChanges: false,
    experimentalRunAllSpecs: true,
    video: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    viewportHeight: 1400,
    viewportWidth: 1900,
    numTestsKeptInMemory: 0,
    scrollBehavior: 'center', // or 'nearest'
  },
});
