import * as selectors from "../../helper/selectors";

export const addNewTodo = todo => {
  cy.get(selectors.addNewTodoInput)
    .type(todo)
    .type("{enter}");
};

export const markItemAsCompleted = num => {
  cy.get(selectors.completedCheckBox(num)).click();
};

export const getFilterByName = name => {
  cy.get(".footer")
    .contains(name)
    .click();
};

export const assertNumberOfTodos = num => {
  cy.get(selectors.todosList).should("have.length", num);
};
