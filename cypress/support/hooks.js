//  See: https://github.com/cypress-io/cypress/issues/95
enableFetchWorkaround()

function enableFetchWorkaround() {
    let polyfill;

    before(() => {
        cy.log('Load fetch XHR polyfill');
        cy.readFile('./cypress/support/polyfills/unfetch.umd.js').then((content) => {
            polyfill = content
        })
    });

    Cypress.on('window:before:load', (win) => {
        delete win.fetch;
        win.eval(polyfill);
        win.fetch = win.unfetch
    })
}