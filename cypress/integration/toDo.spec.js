import {
  addNewTodo,
  todoListSelector,
  footerSelector,
  todoListElement
} from "../support/pageModels";

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
      cy.get(".todo-list li:nth-child(2) .destroy").click({ force: true });
      todoListElement(2);
    });

    it("Should mark an item as completed", () => {
      todoListSelector(1);
      footerSelector(5);
      cy.get(".selected").should("have.length", 1);
    });

    it("Display only active todos", () => {
      todoListSelector(2);

      footerSelector(3);
      todoListElement(2);
    });

    it("Display only completed todos", () => {
      todoListSelector(3);
      footerSelector(5);
      todoListElement(1);
    });

    it("Display the number of the left items", () => {
      cy.get(".todo-count").should("contain", 3);
    });
  });
});
