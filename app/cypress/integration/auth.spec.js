describe('User can Login and Logout', function() {
  it('Logs In', function() {
    cy.visit('http://localhost:3000')
    cy.get('#sign-in-button').click()

    cy.get(':nth-child(1) > .ui > input')
        .type('testing@stardrop.com')
        .should('have.value', 'testing@stardrop.com')

    cy.get(':nth-child(2) > .ui > input')
        .type('testing')
        .should('have.value', 'testing')

    cy.get(':nth-child(3) > .ui').click()

    cy.get('.right > .ui').click()
    cy.get('.right > .ui > .menu > .item > div').click()
  })
})