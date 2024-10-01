import { MOCK_COOKIE } from "../support/mocks";
import PageObject from "./auth.po";

describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/register/");
  });

  it("should have correct heading", () => {
    cy.title().should("eq", "Register");
  });

  it("should show error on wrong email", () => {
    cy.intercept("POST", "http://localhost:3000/api/v1/auth/register", {
      message: "User already exists...",
    });
    PageObject.usernameInput().type("wronginput@example.com");
    PageObject.passwordInput().type("click123");
    PageObject.submitButton().click();
    PageObject.toast().should("be.visible");
    PageObject.toast().should(
      "have.text",
      "Could not register. User already exists...",
    );
  });

  it("should log register successfully", () => {
    cy.intercept("POST", "http://localhost:3000/api/v1/auth/register", {
      user: {
        username: "test@example.com",
      },
    });
    cy.setCookie("quotesAuthToken", MOCK_COOKIE);
    PageObject.usernameInput().type("wronginput@example.com");
    PageObject.passwordInput().type("click123");
    PageObject.submitButton().click();
    cy.url().should("eq", "http://localhost:5173/");
  });
});
