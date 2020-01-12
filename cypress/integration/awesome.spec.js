import {firstUser, usersJson} from "../data/users";

context('Window', () => {
    beforeEach(() => {
        cy.prepareBackend();
        cy.visit('/');
    });

    it('should have proper data displayed', () => {
        const numberOfUsers = usersJson.length;
        for (let i = 0; i < numberOfUsers; i++) {
            cy.get(`.MuiTableBody-root tr:nth-of-type(${i + 1})`).within(() => {
                cy.get('[name=firstname]').should('have.text', usersJson[i].firstName);
                cy.get('[name=lastname]').should('have.text', usersJson[i].lastName);
                cy.get('[name=username]').should('have.text', usersJson[i].userName);
                cy.get('[name=age]').should('have.text', usersJson[i].age.toString());
                cy.get('[name=salary]').should('have.text', usersJson[i].salary.toString());
            })
        }
    });

    const testData = {
        userName: 'sampleLogin',
        firstName: 'John',
        lastName: 'Doe',
        age: 19,
        salary: 99999
    };

    it('should send edit request', () => {
        cy.route({
            url: '/users/1',
            method: 'PUT',
            status: 200,
            response: {}
        }).as('updateUser');

        cy.get('[name=edit] svg').first().click();
        cy.get('[name=userName').clear().type(testData.userName);
        cy.get('[name=firstName').clear().type(testData.firstName);
        cy.get('[name=lastName').clear().type(testData.lastName);
        cy.get('[name=age').clear().type(testData.age);
        cy.get('[name=salary').clear().type(testData.salary);
        cy.get('button.MuiButton-containedPrimary').click();

        cy.wait('@updateUser').should((xhr) => {
            let body = xhr.request.body;
            expect(body.id).to.equal(firstUser.id);
            expect(body.userName).to.equal(testData.userName);
            expect(body.firstName).to.equal(testData.firstName);
            expect(body.lastName).to.equal(testData.lastName);
            expect(body.age).to.equal(testData.age.toString());
            expect(body.salary).to.equal(testData.salary.toString());
        });
    });
});
