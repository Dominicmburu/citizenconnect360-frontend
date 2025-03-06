describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signup");
  });

  it("should display the signup form correctly", () => {
    cy.get("h2").contains("Sign Up");
    cy.get("input#username").should("be.visible");
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.get("input#confirmPassword").should("be.visible");
    cy.get("button[type='submit']").should("contain", "Sign Up");
  });

  it("should show validation errors for empty fields", () => {
    cy.get("button[type='submit']").click();

    cy.get(".Toastify__toast").should("contain", "Username is required");
  });

  it("should show an error for a short password", () => {
    cy.get("input#username").type("Dominic");
    cy.get("input#email").type("dominicmburu034@gmail.com");
    cy.get("input#password").type("12345");
    cy.get("button[type='submit']").click();
    cy.get(".Toastify__toast").should("contain", "Password must be at least 6 characters");
  });

  it("should show an error if passwords do not match", () => {
    cy.get("input#username").type("Dominic");
    cy.get("input#email").type("dominicmburu034@gmail.com");
    cy.get("input#password").type("password123");
    cy.get("input#confirmPassword").type("password456");
    cy.get("button[type='submit']").click();
    cy.get(".Toastify__toast").should("contain", "Passwords do not match");
  });

  // it("should register successfully with valid credentials", () => {
  //   cy.get("input#username").type("dominicmburu");
  //   cy.get("input#email").type("dominicmburu036@gmail.com");
  //   cy.get("input#password").type("password123");
  //   cy.get("input#confirmPassword").type("password123");
  //   cy.get("button[type='submit']").click();
  
  //   cy.wait(1000);
  
  //   cy.window().then((win) => {
  //     console.log("Toast messages:", win.document.querySelector(".Toastify__toast"));
  //   });
  
  //   cy.contains("Registration successful!").should("exist"); 
  //   cy.url().should("include", "/login");
  // });
  

  it("should navigate to login page when clicking Login link", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login");
  });
});
