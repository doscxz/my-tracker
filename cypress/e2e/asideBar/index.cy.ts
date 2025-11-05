/// <reference types="cypress" />

describe('Меню навигации', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Должен отображать логотип MyTracker', () => {
    cy.getCy('heading-logo-side-bar').should('be.visible');
  });

  it('Должен отображать все пункты меню', () => {
    cy.getCy('navigation-link-Панель Kanban')
      .should('be.visible')
      .and('contain.text', 'Панель Kanban');

    cy.getCy('navigation-link-Задачи').should('be.visible').and('contain.text', 'Задачи');
  });

  it('Должен отображать иконки для каждого пункта меню', () => {
    cy.getCy('icon-navigation-link-Панель Kanban')
      .should('be.visible')
      .find('svg')
      .should('be.visible')
      .and('have.class', 'w-[24px]')
      .and('have.class', 'h-[24px]');

    cy.getCy('icon-navigation-link-Задачи')
      .should('be.visible')
      .find('svg')
      .should('be.visible')
      .and('have.class', 'w-[24px]')
      .and('have.class', 'h-[24px]');
  });

  it('Должен переходить на страницы из sibeBar', () => {
    cy.getCy('icon-navigation-link-Панель Kanban').should('be.visible').find('svg').click();

    cy.url().should('include', '/kanban-table');
    cy.getCy('icon-navigation-link-Задачи').should('be.visible').find('svg').click();

    cy.url().should('include', '/');
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
