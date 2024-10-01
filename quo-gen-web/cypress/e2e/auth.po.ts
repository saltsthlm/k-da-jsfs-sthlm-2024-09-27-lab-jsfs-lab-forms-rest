const PageObject = {
  usernameInput() {
    return cy.get("#username");
  },
  passwordInput() {
    return cy.get("#password");
  },
  submitButton() {
    return cy.get('form button[type="submit"]');
  },
  toast() {
    return cy.get(".toast");
  },
};

export default PageObject;
