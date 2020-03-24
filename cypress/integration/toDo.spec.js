const addNewTodo = todo => {
  cy.get(".new-todo")
    .type(todo)
    .type("{enter}");
};

describe("To do page", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should have title", () => {
    cy.title().should("equal", "React • TodoMVC");
  });

  describe("Should add new todos", () => {
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

    it("Should mark an item as completed", () => {});

    it("Display only active todos", () => {});

    it("Display only completed todos", () => {});

    it("Display the number of the left items", () => {
      cy.get(".todo-count").should("contain", 3);
    });
  });
});
