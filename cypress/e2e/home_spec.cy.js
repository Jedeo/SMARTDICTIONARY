describe('empty spec', () => {
  beforeEach(()=> {
    cy.intercept("GET", Cypress.env("wordFetchUrl"), {

    })
    cy.intercept("GET", Cypress.env("examplesUrl"), {
      
    })
    cy.visit('http://localhost:3000/')
  })
  it('test', () => {
    cy.get(".form-input")
  })
})