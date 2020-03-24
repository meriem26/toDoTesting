describe("To do page", function() {
  beforeEach(() => {
    cy.visit("/");
  });
  it('should have title', () => {
      cy.title().should('equal', 'React • TodoMVC')
  })
});
