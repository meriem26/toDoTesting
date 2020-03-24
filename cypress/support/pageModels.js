export const addNewTodo = todo => {
  cy.get(".new-todo")
    .type(todo)
    .type("{enter}");
};

export const markItemAsCompleted = num => {
  cy.get(`.todo-list li:nth-child(${num}) .toggle`).click();
};

export const getFilterByName = name => {
  cy.get(".footer")
    .contains(name)
    .click();
};

export const assertNumberOfTodos = num => {
  cy.get(".todo-list li").should("have.length", num);
};
