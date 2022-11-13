describe("empty spec", () => {
  beforeEach(() => {
    
    cy.intercept("GET", Cypress.env("wordFetchUrl"), [
      {
        text: "undergo transportation as in a vehicle",
        word: "travel",
      },
    ]);
    cy.intercept("GET", Cypress.env("wordOfTheDayUrl"), {});
    cy.intercept("GET", Cypress.env("examplesUrl"), {
      examples: [
        {
          word: "travel",
          text: '"To serve their senses that travel by it, or have no garden," interrupted Arthur, reading from the book, "and, oh, Mary! that reminds me -- _travel -- travellers.',
        },
        {
          word: "travel",
          text: "From white water rafting to cenote-diving, one of the hottest trends in travel is nature-based tourism, and many guidebooks respond by including extensive descriptions of flamingo tours, canyon cruises and sea-turtle habitats.",
        },
        {
          word: "travel",
          text: "From white water rafting to cenote-diving, one of the hottest trends in travel is nature-based tourism, and many guidebooks respond by including extensive descriptions of flamingo tours, canyon cruises and sea-turtle habitats.",
        },
        {
          word: "travel",
          text: "To inspect as good as exam a travel is a unequivocally critical component in following a spirit.",
        },
      ],
    });
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
      .should("exist")
      .should("be.visible")
      .contains("submit");
  });
  it("should be able to type in input box", () => {
    cy.get(".form-input").type("travel");
    cy.get(".submit-button").click();
  });

  it('should bring a user to the error page if the user types in a bad URL', () => {
    cy
      .visit('http://localhost:3000/wordOfTheDays')
      cy.get('.error').contains('page not found please try again later')
  })
});
