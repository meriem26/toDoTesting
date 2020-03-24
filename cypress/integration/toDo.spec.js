import {addNewTodo} from "../support/pageModels";

describe("To do page", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should have title", () => {
    cy.title().should("equal", "React • TodoMVC");
  });

  describe("Add new todos", () => {
    beforeEach(() => {
      addNewTodo("Go shopping");
      addNewTodo("Call doctor");
      addNewTodo("Have lunch");
    });

    it("Should contain a list of todos", () => {
      cy.get(".todo-list").should("be.visible");
    });

    it("Delete an item", () => {
      cy.get(
        "body > section > div > section > ul > li:nth-child(2) > div > button"
      ).click({ force: true });
      cy.get(".todo-list li").should("have.length", 2);
    });

    it("Should mark an item as completed", () => {
      cy.get(
        "body > section > div > section > ul > li:nth-child(1) > div > input"
      ).click();
      cy.get(
        "body > section > div > footer > ul > li:nth-child(5) > a"
      ).click();
      cy.get(".selected").should("have.length", 1);
    });

    it("Display only active todos", () => {
      cy.get(
        "body > section > div > section > ul > li:nth-child(2) > div > input"
      ).click();

      cy.get(
        "body > section > div > footer > ul > li:nth-child(3) > a"
      ).click();
      cy.get(".todo-list li").should("have.length", 2);
    });

    it("Display only completed todos", () => {
      cy.get(
        "body > section > div > section > ul > li:nth-child(3) > div > input"
      ).click();
      cy.get("body > section > div > footer > ul > li:nth-child(5) > a")
        .click()
        cy.get(".todo-list li").should("have.length", 1);
        
    });

    it("Display the number of the left items", () => {
      cy.get(".todo-count").should("contain", 3);
    });
  });
});
