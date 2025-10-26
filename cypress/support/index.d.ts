/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getCy(selector: string, isPrefix?: boolean): Chainable<JQuery<HTMLElement>>;
      dragTo(sourceSelector: string, targetSelector: string): Chainable<void>;
      resetAppState(): Chainable<void>;
      findTaskByTitle(title: string): Chainable<JQuery<HTMLElement>>;
      findTaskInColumn(columnName: string, title: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
