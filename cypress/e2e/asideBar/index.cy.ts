/// <reference types="cypress" />

describe('Меню навигации', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Должен отображать заголовок MyTracker', () => {
    cy.getCy('heading-side-bar').should('be.visible').and('contain.text', 'MyTracker');
  });

  it('Должен отображать все пункты меню', () => {
    cy.getCy('navigation-link-Панель Kanban')
      .should('be.visible')
      .and('contain.text', 'Панель Kanban');

    cy.getCy('navigation-link-Задачи').should('be.visible').and('contain.text', 'Задачи');
  });

  it('Должен отображать иконки для каждого пункта меню', () => {
    cy.getCy('navigation-link-Панель Kanban')
      .parent()
      .find('img')
      .should('be.visible')
      .and('have.attr', 'src', '/svg/kanban.svg');

    cy.getCy('navigation-link-Задачи')
      .parent()
      .find('img')
      .should('be.visible')
      .and('have.attr', 'src', '/svg/task.svg');
  });

  it('Должен переходить на страницу Kanban при клике на "Панель Kanban"', () => {
    cy.getCy('navigation-link-Панель Kanban').click();

    cy.url().should('include', '/kanban-table');
  });

  it('Должен переходить на страницу задач при клике на "Задачи"', () => {
    cy.getCy('navigation-link-Задачи').click();

    cy.url().should('include', '/task');
  });

  it('Должен иметь правильные стили для заголовка', () => {
    cy.getCy('heading-side-bar')
      .should('have.class', 'text-4xl')
      .and('have.class', 'text-slate-300');
  });

  it('Должен иметь правильные стили для ссылок', () => {
    cy.getCy('navigation-link-Панель Kanban').should('have.class', 'text-slate-300');

    cy.getCy('navigation-link-Задачи').should('have.class', 'text-slate-300');
  });
});
