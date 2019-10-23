describe("View Page", function() {
  before(function() {
    cy.visit("http://localhost:3000/artifact/edit/zSan0Jv1O2Y5Nhyymn5C")
  })
  it("Displays Editing", function() {
    cy.get(".center > .ui").should("contain", "Editing Artifact")
  })
  it("Displays Title", function() {
    cy.get(":nth-child(1) > label").should("contain", "Title")
    cy.get(":nth-child(1) > textarea").should("contain", "Dance Ball !")
  })
  it("Displays Description", function() {
    cy.get(":nth-child(2) > label").should("contain", "Description")
    cy.get(":nth-child(2) > textarea").should(
      "contain",
      "I went to dance ball!"
    )
  })
  it("Requires changes to Submit", function() {
    cy.get(".large > .ui").click()
    cy.get(".large > .ui").should("contain", "No changes have been made!")
  })
})
