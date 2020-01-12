
import './commands'

Cypress.on("window:before:load", win => {
    win.fetch = null;
});