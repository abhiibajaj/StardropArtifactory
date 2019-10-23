describe("Add Page", function() {
  before(function() {
    cy.visit("http://localhost:3000/addartifact")
  })
  it("Displays Upload Label", function() {
    cy.get(":nth-child(1) > label").should("contain", "*Upload your Artifacts:")
  })
  it("Titles correctly", function() {
    cy.get(":nth-child(2) > .ui > input")
      .type("Cypress title")
      .should("have.value", "Cypress title")
  })
  it("Descriptions correctly", function() {
    cy.get("textarea")
      .type("Cypress description")
      .should("have.value", "Cypress description")
  })
  it("Keywords correctly", function() {
    cy.get(":nth-child(4) > .ui > input")
      .type("cypress testing")
      .should("have.value", "cypress testing")
  })
  it("Dates correctly", function() {
    cy.get(".react-datepicker__input-container > input").click()
    cy.get(":nth-child(1) > .react-datepicker__day--001").click()
  })
})
