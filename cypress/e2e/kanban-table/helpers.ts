function createColumn(nameColumn: string) {
  // Создает колонку
  cy.getCy('add-column-button').click();
  cy.getCy('status-name-input').type(nameColumn);
  cy.getCy('status-modal-submit-button').click();
}

export { createColumn };
