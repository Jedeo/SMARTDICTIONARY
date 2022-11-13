describe('Learn spec', () => {
  beforeEach(() => {
    
    cy.intercept("GET", Cypress.env("wordFetchUrl"),{fixture: 'quizDefs'});
    cy.intercept("GET", Cypress.env("randomWords"), {fixture: 'quizWords'}
      );
   
    cy.visit("http://localhost:3000/quiz");
  });
  it("should have a navbar", () => {
    cy.get(".navbar").should("exist").should("be.visible");
    cy.get(".home-button").should("exist").should("be.visible");
    cy.get(".word-of-the-day-button").should("exist").should("be.visible");
    cy.get(".learn-button").should("exist").should("be.visible");
  });
  it('should be at quiz container', () => {
    cy.get('.quiz-container').should("exist")
  })

  it("should have a start button", () => {
    cy.get('.start-game').should("exist").should("be.visible")
    cy.get('.submit-button').contains("Start").should("be.visible")
  })
  it("should be able to click on the start button and start quiz", ()=> {
    cy.get('.submit-button').should("exist").should("be.visible").click()
  })

  it("should be able to go back and forth", () => {

  })
})