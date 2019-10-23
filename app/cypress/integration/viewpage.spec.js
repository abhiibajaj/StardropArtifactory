describe("View Page", function() {
  before(function() {
    cy.visit("http://localhost:3000/artifact/zSan0Jv1O2Y5Nhyymn5C")
  })
  it("Displays Title", function() {
    cy.get(".center > .ui").should("contain", "Dance Ball !")
  })
  it("Displays Description", function() {
    cy.get(".four > .one > .column > :nth-child(1)").should(
      "contain",
      "Description"
    )
  })
  it("Displays Description content", function() {
    cy.get(".one > .column > :nth-child(2)").should(
      "contain",
      "I went to dance ball!"
    )
  })
  it("Displays Date of Origin", function() {
    cy.get(".one > .column > :nth-child(3)").should("contain", "Date of Origin")
  })
  it("Displays Date of Origin", function() {
    cy.get(".one > .column > :nth-child(4)").should(
      "contain",
      "Thu Oct 18 2018"
    )
  })
  it("Transitions Carousel", function() {
    cy.get(".carousel__dot--1").click()
  })
  it("Can Comment", function() {
    cy.get("textarea")
      .type("cypress test comment")
      .should("have.value", "cypress test comment")
    cy.get(".form > .ui").click()

    cy.get(".content > .text").should("contain", "cypress test comment")
  })
})
