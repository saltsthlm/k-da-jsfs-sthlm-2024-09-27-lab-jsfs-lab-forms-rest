import { MOCK_COOKIE } from "../support/mocks";
import PageObject from "./auth.po";

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login/");
  });

  it("should have correct heading", () => {
    cy.title().should("eq", "Login");
  });

  it("should show error on wrong email", () => {
    cy.intercept("POST", "http://localhost:3000/api/v1/auth/login", {
      message: "Username or password incorrect",
    });
    PageObject.usernameInput().type("wronginput@example.com");
    PageObject.passwordInput().clear();
    PageObject.submitButton().click();
    PageObject.toast().should("be.visible");
    PageObject.toast().should(
      "have.text",
      "Could not login. Username or password incorrect",
    );
  });

  it("should log in successfully", () => {
    cy.intercept("POST", "http://localhost:3000/api/v1/auth/login", {
      user: {
        username: "test@example.com",
      },
    });
    cy.setCookie("quotesAuthToken", MOCK_COOKIE);
    PageObject.usernameInput().type("wronginput@example.com");
    PageObject.passwordInput().clear();
    PageObject.submitButton().click();
    cy.url().should("eq", "http://localhost:5173/");
  });
});
