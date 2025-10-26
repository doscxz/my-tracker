/// <reference types="cypress" />

/**
 * Выбирает первую доступную задачу из списка
 */
export function selectFirstTask() {
  cy.wait(1000); // Ждем загрузки задач
  cy.get('[data-cy^="task-card-"]').first().click();
}

/**
 * Выбирает задачу по её ID
 * @param taskId - ID задачи
 */
export function selectTaskById(taskId: number) {
  cy.wait(1000);
  cy.get(`[data-cy="task-card-${taskId}"]`).click();
}

/**
 * Выбирает задачу по её названию
 * @param taskTitle - Название задачи
 */
export function selectTaskByTitle(taskTitle: string) {
  cy.wait(1000);
  cy.get('[data-cy^="task-title-"]').contains(taskTitle).parent().parent().click();
}

/**
 * Удаляет задачу по её ID
 * @param taskId - ID задачи
 */
export function deleteTaskById(taskId: number) {
  cy.get(`[data-cy="task-card-${taskId}"]`).trigger('mouseover');
  cy.get(`[data-cy="delete-task-button-${taskId}"]`).click();
  cy.get('[data-cy="confirm-modal-confirm-button"]').click();
}

/**
 * Редактирует поле задачи
 * @param fieldText - Текст поля для поиска
 * @param newValue - Новое значение
 */
export function editTaskField(fieldText: string, newValue: string) {
  cy.contains(fieldText).parent().find('span').first().click();
  cy.get('input[type="text"]').clear().type(newValue);
  cy.get('input[type="text"]').type('{enter}');
}

/**
 * Добавляет комментарий к задаче
 * @param comment - Текст комментария
 */
export function addComment(comment: string) {
  cy.get('textarea').type(comment);
  cy.get('textarea').type('{enter}');
}

/**
 * Сворачивает/разворачивает секцию деталей задачи
 */
export function toggleStatisticsSection() {
  cy.contains('Детали задачи').click();
}

/**
 * Сворачивает/разворачивает секцию описания
 */
export function toggleDescriptionSection() {
  cy.contains('Описание').click();
}

/**
 * Проверяет, что панель выбора задачи отображается
 */
export function expectChooseTaskPanel() {
  cy.contains('Выберете задачу для отображения ее информации').should('be.visible');
}

/**
 * Проверяет, что панель информации о задаче отображается
 */
export function expectTaskInfoPanel() {
  cy.getCy('task-info-panel-content').should('be.visible');
  cy.getCy('task-info-title').should('exist');
}

/**
 * Ожидает завершения загрузки задач
 */
export function waitForTasksToLoad() {
  cy.wait(1000);
  cy.get('[data-cy^="task-card-"]').should('exist');
}
