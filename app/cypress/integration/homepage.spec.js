describe("Home Page", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000")
  })

  it("Loads Artifacts Correctly", function() {
    // something loads
    cy.get(":nth-child(1) > a > .content > .ui")
    // redirects to view
    cy.get(":nth-child(1) > a > .content > .ui").click()
    cy.url().should("include", "/artifact")
  })

  it("Loads Searches", function() {
    cy.get("input").type("trip")
    cy.get(":nth-child(1) > a > .content > .ui").click()
    cy.url().should("include", "/artifact")
  })
})
