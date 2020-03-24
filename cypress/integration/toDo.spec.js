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
    it("Delete an item", () => {});
    it("Should mark an item as completed", () => {});
    it("Display only active todos", () => {});
    it("Display only completed todos", () => {});
    it("Display the number of the left items", () => {});
  });
});
