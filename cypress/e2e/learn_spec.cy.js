describe('empty spec', () => {
  beforeEach(() => {
    
    cy.intercept("GET", Cypress.env("wordFetchUrl"), [
      [
        {
            "text": "Not packed.",
            "word": "unpacked",
        },
        {
            "text": "Not yet having had the contents removed; not yet unpacked.",
            "word": "unpacked",
        },
        {
            "text": "Past participle of <xref>unpack</xref>",
            "word": "unpacked",
        },
        {
            "text": "Having had its <xref>packing</xref> removed.",
            "word": "unpacked",
            
        },
        {
            "text": "Not yet packed.",
            "word": "unpacked",
  
        }
    ],
    ]);
    cy.intercept("GET", Cypress.env("randomWords"), 
      [
        {
            "id": 0,
            "word": "unpacked"
        },
        {
            "id": 0,
            "word": "spacebar"
        }
    ]);
   
    cy.visit("http://localhost:3000/");
  });
  it('passes', () => {
  })
})