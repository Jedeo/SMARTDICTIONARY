describe("empty spec", () => {
  beforeEach(() => {
    
    cy.intercept("GET", Cypress.env("wordFetchUrl"), [
      {
        text: "undergo transportation as in a vehicle",
        word: "travel",
      },
    ]);
    cy.intercept("GET", Cypress.env("wordOfTheDayUrl"), {fixture: "wordOfTheDay"});
    cy.intercept("GET", Cypress.env("examplesUrl"), {fixture: "example"});
    cy.visit("http://localhost:3000/");
  });
  it("should display a 'Discover today's word'", () => {
    cy.get(".discover")
      .should("exist")
      .should("be.visible")
      .contains("Discover today's word");
  });
  it("should have todays word", ()=> {
    cy.intercept("GET", Cypress.env("wordOfTheDayUrl"), {
      fixture: "wordOfTheDay",
    });
    cy.get('.todays-word').should("be.visible").contains("doughty")
  })
  it("should have a navbar", () => {
    cy.get(".navbar").should("exist").should("be.visible");
    cy.get(".home-button").should("exist").should("be.visible");
    cy.get(".word-of-the-day-button").should("exist").should("be.visible");
    cy.get(".learn-button").should("exist").should("be.visible");
  });
  it("should have a search bar", () => {
    cy.get(".container").should("exist");
    cy.get(".form-container").should("exist").should("be.visible");
    cy.get(".form-input").should("exist").should("be.visible");
    cy.get(".submit-button")
      .should("not.exist")
  });
  it("should be able to type in input box", () => {
    cy.get(".form-input").type("travel");
    cy.get(".submit-button").should("exist").contains("submit")
    cy.get(".submit-button")
      
  });

  it('should bring a user to the error page if the user types in a bad URL', () => {
    cy
      .visit('http://localhost:3000/wordOfTheDays')
      cy.get('.error').contains('page not found please try again later')
  })

  it("Should an error message if searched word is invalid",()=>{
    cy.intercept("GET", Cypress.env("invalidUrl"),{
      body:{}
    })
    cy.visit("http://localhost:3000")
    cy.get('.form-input').type("asdsadsa")
    cy.get(".submit-button").click()
    cy.get('.error').contains("An error has occurred: 404")
  })
 
});
