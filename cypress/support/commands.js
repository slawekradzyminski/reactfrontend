import {firstUser, secondUser, usersJson} from "../data/users";

Cypress.Commands.add("prepareBackend", () => {
    cy.server();
    cy.route('/users', usersJson);
    cy.route('/users/1', firstUser);
    cy.route('/users/2', secondUser);
});
