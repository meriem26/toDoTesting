import {
  addNewTodo,
  markItemAsCompleted,
  getFilterByName,
  assertNumberOfTodos
} from "../support/pageModels";

describe("To do page", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should have title", () => {
    cy.title().should("equal", "React • TodoMVC");
  });

  describe("Todos list", () => {
    beforeEach(() => {
      addNewTodo("Go shopping");
      addNewTodo("Call doctor");
      addNewTodo("Have lunch");
    });

    it("should contain a list", () => {
      cy.get(".todo-list").should("be.visible");
    });

    it("should allow to delete an item", () => {
      cy.get(".todo-list li:nth-child(2) .destroy").click({ force: true });
      assertNumberOfTodos(2);
    });

    it("should allow to mark an item as completed", () => {
      markItemAsCompleted(1);
      getFilterByName("Completed");
      cy.get(".selected").should("have.length", 1);
    });

    it("should display only active todos", () => {
      markItemAsCompleted(2);

      getFilterByName("Active");
      assertNumberOfTodos(2);
    });

    it("should display only completed todos", () => {
      markItemAsCompleted(3);
      getFilterByName("Completed");
      assertNumberOfTodos(1);
    });

    it("should display the number of the left items", () => {
      cy.get(".todo-count").should("contain", 3);
    });
  });
});
