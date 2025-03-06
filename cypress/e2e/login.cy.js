describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login"); 
  });

  it("should show login form", () => {
    cy.get("h2").contains("Login");
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.get("button[type='submit']").should("contain", "Login");
  });

  it("should show error for empty fields", () => {
    cy.get("button[type='submit']").click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("should show error for incorrect credentials", () => {
    cy.get("input#email").type("wrong@example.com");
    cy.get("input#password").type("wrongpassword");
    cy.get("button[type='submit']").click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("should login successfully with correct credentials", () => {
    cy.get("input#email").type("mburudominic381@gmail.com");
    cy.get("input#password").type("password");
    cy.get("button[type='submit']").click();

    cy.url().should("include", "/dashboard");
    cy.window().its("localStorage.token").should("exist");
    cy.contains("Login successful").should("be.visible");
  });
});
