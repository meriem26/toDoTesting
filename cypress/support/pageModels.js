export const addNewTodo = todo => {
    cy.get(".new-todo")
      .type(todo)
      .type("{enter}");
  };