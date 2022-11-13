describe("empty spec", () => {
  beforeEach(() => {
    cy.intercept("GET", Cypress.env("wordOfTheDayUrl"), {
      fixture: "wordOfTheDay",
    });
    cy.intercept("GET", Cypress.env("randomWords"), { fixture: "quizWords" });

    cy.visit("http://localhost:3000/wordOfTheDay");
  });
  it("should have a navbar", () => {
    cy.get(".navbar").should("exist").should("be.visible");
    cy.get(".home-button").should("exist").should("be.visible");
    cy.get(".word-of-the-day-button").should("exist").should("be.visible");
    cy.get(".learn-button").should("exist").should("be.visible");
  });
  it('should have a header of ex "Nov 2022 Word Of The Day"', () => {
    cy.get("h1").should("be.visible").contains("Nov 2022 Word Of The Day");
  });

  it("should have the word of the day and its definitions", () => {
    cy.get(".word-and-definition").should("exist");
    cy.get(".list-of-definitions > :nth-child(1)").contains(
      "Marked by stouthearted courage; brave."
    );
    cy.get(".list-of-definitions > :nth-child(2)").contains(
      "Strong; brave; spirited; valiant; powerful."
    );
    cy.get(".list-of-definitions > :nth-child(3)").contains(
      "Brave; bold; courageous; valiant; intrepid; stouthearted; fearless."
    );
    cy.get(".list-of-definitions > :nth-child(4)").contains(
      "Hardy; strenuous; dauntless; resolute."
    );
  });

  it("should have a note about the word", () => {
    cy.get(".note").contains("Note").should("be.visible");
    cy.get(".extra-detail")
      .should("be.visible")
      .contains(
        "The word 'doughty' comes from a Middle English word meaning 'brave, valiant, bold'."
      );
  });

  it("should have examples for word of the day", () => {
    cy.get(".word-examples");
    cy.get(".list-of-examples").should("exist");
    cy.get(".list-of-examples > :nth-child(1)").contains(
      "The record was, I think, called Peace, a heart-warming exhortation for world leaders to avoid war – although many of them, unbelievably, have completely ignored the doughty cloggers' message in the intervening years. -Which footballers have produced their own food and drink?"
    );
    cy.get(".list-of-examples > :nth-child(3)").contains(
      "The building of the huge transcontinental railroads in the post-Civil War era, for instance, was routinely celebrated as a great triumph, achieved by doughty heroes against daunting odds. -Tracks Across America"
    );
  });

  it("should bring a user to the error page if the user types in a bad URL", () => {
    cy.visit("http://localhost:3000/wordOfTheDay/jedeo");
    cy.get(".error").contains("page not found please try again later");
  });

  it("should display a message to the user if the GET request fails", () => {
    cy.intercept("GET", Cypress.env("wordOfTheDayUrl"), {
      statusCode: 404,
      ok: false,
    });
    cy.visit("http://localhost:3000/wordOfTheDay")
      .get(".error")
      .contains("An error has occurred: 404");
  });
});
