describe("Userpage Tests", () => {
    beforeEach(() => {
      cy.intercept("GET", "http://localhost:5000/api/polls", {
        statusCode: 200,
        body: { polls: [{ id: 1, title: "Test Poll" }] },
      }).as("getPolls");
  
      cy.visit("http://localhost:5173/dashboard");
    });
  
    it("should display the Userpage correctly", () => {
      cy.contains("Current Public Polls").should("be.visible");
    });
  
    it("should fetch and display polls", () => {
      cy.wait("@getPolls");
      cy.contains("Test Poll").should("be.visible");
    });
  
    it("should open and close the Report Incident modal", () => {
      cy.contains("Report Incident").click();
      cy.get("#modal").should("be.visible");
      
      cy.get(".close").click();
      cy.get("#modal").should("not.exist");
    });
  
    it("should open and close the Poll Voting modal", () => {
      cy.wait("@getPolls");
      cy.contains("Test Poll").parent().find("button").contains("Vote").click();
      
      cy.get("#modal").should("be.visible");
      cy.get(".close").click();
      cy.get("#modal").should("not.exist");
    });
  
    it("should open and close the Poll Results modal", () => {
      cy.wait("@getPolls");
      cy.contains("Test Poll").parent().find("button").contains("View").click();
      
      cy.get("#modal").should("be.visible");
      cy.get(".close").click();
      cy.get("#modal").should("not.exist");
    });
  });
  