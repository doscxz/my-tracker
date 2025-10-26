/// <reference types="cypress" />
/// <reference path="./index.d.ts" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Сбрасывает состояние приложения для тестов
       */
      resetAppState(): Chainable<void>;
      /**
       * Находит задачу по названию
       */
      findTaskByTitle(title: string): Chainable<JQuery<HTMLElement>>;
      /**
       * Находит задачу в конкретной колонке
       */
      findTaskInColumn(columnName: string, title: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
Cypress.Commands.add('getCy', (selector, isPrefix = false) => {
  return isPrefix ? cy.get(`[data-cy^="${selector}"]`) : cy.get(`[data-cy="${selector}"]`);
});

// Команда для поиска задачи по названию
Cypress.Commands.add('findTaskByTitle', (title: string) => {
  return cy.get(`[data-cy*="task-title-"]`).contains(title).parent();
});

// Команда для поиска задачи в конкретной колонке
Cypress.Commands.add('findTaskInColumn', (columnName: string, title: string) => {
  return cy
    .get(`[data-cy="tasks-container-${columnName.toLowerCase().replace(/\s+/g, '-')}"]`)
    .within(() => {
      cy.get(`[data-cy*="task-title-"]`).contains(title).parent();
    });
});

export {};
