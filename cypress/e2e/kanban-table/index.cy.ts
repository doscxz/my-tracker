/// <reference types="cypress" />
import { createColumn } from './helpers';

const NAME_COLUMN = 'Тестовая колонка'.toLowerCase().replace(/\s+/g, '-');

describe('Канбан доска', () => {
  beforeEach(() => {
    cy.visit('/kanban-table');
  });

  // describe('Основные элементы интерфейса', () => {
  //   it('должна отображать заголовок канбан доски', () => {
  //     cy.getCy('kanban-title').should('be.visible').and('contain.text', 'Kanban Доска');
  //   });

  //   it('должна отображать кнопку добавления колонки', () => {
  //     cy.getCy('add-column-button').should('be.visible').and('contain.text', 'Добавить колонку');
  //   });

  //   it('должна отображать контейнер для колонок', () => {
  //     cy.getCy('kanban-columns-container').should('be.visible');
  //   });
  // });

  // describe('Управление колонками', () => {
  //   it('должна создавать новую колонку', () => {
  //     // Нажимаем кнопку добавления колонки
  //     cy.getCy('add-column-button').click();

  //     // Проверяем, что открылось модальное окно
  //     cy.getCy('modal-overlay').should('be.visible');
  //     cy.getCy('modal-title').should('contain.text', 'Создание колонки');

  //     // Заполняем форму
  //     cy.getCy('status-name-input').type('Новая колонка');

  //     // Создаем колонку
  //     cy.getCy('status-modal-submit-button').click();

  //     // Проверяем, что колонка создалась
  //     cy.getCy('kanban-column-новая-колонка').should('be.visible');
  //     cy.getCy('column-title-новая-колонка').should('contain.text', 'Новая колонка');
  //   });

  //   it('должна отменять создание колонки', () => {
  //     cy.getCy('add-column-button').click();
  //     cy.getCy('status-name-input').type('Отмененная колонка');
  //     cy.getCy('status-modal-cancel-button').click();

  //     // Проверяем, что модальное окно закрылось
  //     cy.getCy('modal-overlay').should('not.exist');

  //     // Проверяем, что колонка не создалась
  //     cy.getCy('kanban-column-отмененная-колонка').should('not.exist');
  //   });

  //   it('должна закрывать модальное окно по клику на крестик', () => {
  //     cy.getCy('add-column-button').click();
  //     cy.getCy('modal-close-button').click();
  //     cy.getCy('modal-overlay').should('not.exist');
  //   });

  //   it('должна удалять колонку', () => {
  //     // Сначала создаем колонку для удаления
  //     cy.getCy('add-column-button').click();
  //     cy.getCy('status-name-input').type('Колонка для удаления');
  //     cy.getCy('status-modal-submit-button').click();

  //     // Удаляем колонку
  //     cy.getCy('delete-column-button-колонка-для-удаления').click();

  //     // Проверяем, что открылось модальное окно подтверждения
  //     cy.getCy('modal-overlay').should('be.visible');
  //     cy.getCy('confirm-modal-message').should(
  //       'contain.text',
  //       'Вы уверены, что хотите удалить эту колонку?'
  //     );

  //     // Подтверждаем удаление
  //     cy.getCy('confirm-modal-confirm-button').click();

  //     // Проверяем, что колонка удалилась
  //     cy.getCy('kanban-column-колонка-для-удаления').should('not.exist');
  //   });

  //   it('должна отменять удаление колонки', () => {
  //     // Создаем колонку
  //     cy.getCy('add-column-button').click();
  //     cy.getCy('status-name-input').type('Колонка для отмены удаления');
  //     cy.getCy('status-modal-submit-button').click();

  //     // Начинаем удаление
  //     cy.getCy('delete-column-button-колонка-для-отмены-удаления').click();

  //     // Отменяем удаление
  //     cy.getCy('confirm-modal-cancel-button').click();

  //     // Проверяем, что колонка осталась
  //     cy.getCy('kanban-column-колонка-для-отмены-удаления').should('be.visible');
  //   });
  // });

  // describe('Управление задачами', () => {
  //   beforeEach(() => {
  //     // Создаем колонку для тестов с задачами
  //     cy.getCy('add-column-button').click();
  //     cy.getCy('status-name-input').type('Тестовая колонка');
  //     cy.getCy('status-modal-submit-button').click();
  //   });

  //   it('должна создавать новую задачу', () => {
  //     // Нажимаем кнопку добавления задачи
  //     cy.getCy('add-task-button-тестовая-колонка').click();

  //     // Проверяем, что открылось модальное окно
  //     cy.getCy('modal-overlay').should('be.visible');
  //     cy.getCy('modal-title').should('contain.text', 'Создание новой задачи');

  //     // Заполняем форму задачи
  //     cy.getCy('task-title-input').type('Тестовая задача');
  //     cy.getCy('task-description-input').type('Описание тестовой задачи');
  //     cy.getCy('task-type-input').type('Тест');
  //     cy.getCy('task-priority-select').select('Средний');
  //     cy.getCy('task-tag-input').type('тест');

  //     // Создаем задачу
  //     cy.getCy('task-modal-submit-button').click();

  //     // Проверяем, что задача создалась - ищем по содержимому
  //     cy.getCy('tasks-container-тестовая-колонка').should('not.be.empty');
  //     cy.getCy('tasks-container-тестовая-колонка').contains('Тестовая задача');
  //     cy.getCy('tasks-container-тестовая-колонка').contains('Описание тестовой задачи');
  //   });

  //   it('должна отменять создание задачи', () => {
  //     cy.getCy('add-task-button-тестовая-колонка').click();
  //     cy.getCy('task-title-input').type('Отмененная задача');
  //     cy.getCy('task-modal-cancel-button').click();

  //     // Проверяем, что модальное окно закрылось
  //     cy.getCy('modal-overlay').should('not.exist');

  //     // Проверяем, что задача не создалась
  //     cy.getCy('tasks-container-тестовая-колонка').should('be.empty');
  //   });

  //   it('должна валидировать обязательные поля при создании задачи', () => {
  //     cy.getCy('add-task-button-тестовая-колонка').click();

  //     // Пытаемся создать задачу без названия
  //     cy.getCy('task-modal-submit-button').click();

  //     // Проверяем, что форма не отправилась (модальное окно все еще открыто)
  //     cy.getCy('modal-overlay').should('be.visible');

  //     // Заполняем только название без приоритета
  //     cy.getCy('task-title-input').type('Задача без приоритета');
  //     cy.getCy('task-modal-submit-button').click();

  //     // Проверяем, что форма все еще не отправилась
  //     cy.getCy('modal-overlay').should('be.visible');
  //   });

  //   it('должна удалять задачу', () => {
  //     // Создаем задачу для удаления
  //     cy.getCy('add-task-button-тестовая-колонка').click();
  //     cy.getCy('task-title-input').type('Задача для удаления');
  //     cy.getCy('task-priority-select').select('Низкий');
  //     cy.getCy('task-modal-submit-button').click();

  //     // Проверяем, что задача создалась
  //     cy.getCy('tasks-container-тестовая-колонка').contains('Задача для удаления');

  //     // Находим и удаляем задачу
  //     cy.getCy('tasks-container-тестовая-колонка').within(() => {
  //       cy.get('[data-cy*="task-card-"]').trigger('mouseover');
  //       cy.get('[data-cy*="delete-task-button-"]').click();
  //     });

  //     // Проверяем, что открылось модальное окно подтверждения
  //     cy.getCy('modal-overlay').should('be.visible');
  //     cy.getCy('confirm-modal-message').should(
  //       'contain.text',
  //       'Вы уверены, что хотите удалить эту задачу?'
  //     );

  //     // Подтверждаем удаление
  //     cy.getCy('confirm-modal-confirm-button').click();

  //     // Проверяем, что задача удалилась
  //     cy.getCy('tasks-container-тестовая-колонка').should('be.empty');
  //   });

  //   it('должна отменять удаление задачи', () => {
  //     // Создаем задачу
  //     cy.getCy('add-task-button-тестовая-колонка').click();
  //     cy.getCy('task-title-input').type('Задача для отмены удаления');
  //     cy.getCy('task-priority-select').select('Высокий');
  //     cy.getCy('task-modal-submit-button').click();

  //     // Проверяем, что задача создалась
  //     cy.getCy('tasks-container-тестовая-колонка').contains('Задача для отмены удаления');

  //     // Начинаем удаление
  //     cy.getCy('tasks-container-тестовая-колонка').within(() => {
  //       cy.get('[data-cy*="task-card-"]').trigger('mouseover');
  //       cy.get('[data-cy*="delete-task-button-"]').click();
  //     });

  //     // Отменяем удаление
  //     cy.getCy('confirm-modal-cancel-button').click();

  //     // Проверяем, что задача осталась
  //     cy.getCy('tasks-container-тестовая-колонка').contains('Задача для отмены удаления');
  //   });
  // });

  // describe('Выбор и просмотр задач', () => {
  //   beforeEach(() => {
  //     // Создаем колонку и задачу для тестов
  //     cy.getCy('add-column-button').click();
  //     cy.getCy('status-name-input').type('Колонка для просмотра');
  //     cy.getCy('status-modal-submit-button').click();

  //     cy.getCy('add-task-button-колонка-для-просмотра').click();
  //     cy.getCy('task-title-input').type('Задача для просмотра');
  //     cy.getCy('task-description-input').type('Подробное описание задачи');
  //     cy.getCy('task-priority-select').select('Высокий');
  //     cy.getCy('task-modal-submit-button').click();
  //   });

  //   it('должна открывать панель информации о задаче при клике на неё', () => {
  //     // Кликаем на задачу
  //     cy.getCy('tasks-container-колонка-для-просмотра').within(() => {
  //       cy.get('[data-cy*="task-card-"]').click();
  //     });

  //     // Проверяем, что открылась панель информации
  //     cy.getCy('task-info-panel').should('be.visible');
  //     cy.getCy('task-info-panel-content').should('be.visible');
  //     cy.getCy('task-info-title').should('contain.text', 'Задача для просмотра');
  //   });

  //   it('должна закрывать панель информации при повторном клике на задачу', () => {
  //     // Открываем панель
  //     cy.getCy('tasks-container-колонка-для-просмотра').within(() => {
  //       cy.get('[data-cy*="task-card-"]').click();
  //     });
  //     cy.getCy('task-info-panel').should('be.visible');

  //     // Кликаем еще раз на ту же задачу
  //     cy.getCy('tasks-container-колонка-для-просмотра').within(() => {
  //       cy.get('[data-cy*="task-card-"]').click();
  //     });

  //     // Проверяем, что панель закрылась
  //     cy.getCy('task-info-panel').should('not.exist');
  //   });
  // });

  describe('Редактирование колонок', () => {
    beforeEach(() => {
      createColumn(NAME_COLUMN);
    });

    it('должна открывать модальное окно редактирования при клике на название колонки', () => {
      // Кликаем на название колонки
      cy.getCy(`column-title-${NAME_COLUMN}`).click();

      // Проверяем, что открылось модальное окно редактирования
      cy.getCy('modal-overlay').should('be.visible');
      cy.getCy('modal-title').should('contain.text', 'Редактирование колонки');

      // Проверяем, что поле содержит исходное название
      cy.getCy('input-field').should('have.value', NAME_COLUMN);
    });

    it('должна отменять редактирование колонки', () => {
      cy.getCy(`column-title-${NAME_COLUMN}`).click();
      cy.getCy('input-field').clear().type('Новое название');
      cy.getCy('input-modal-cancel-button').click();

      // Проверяем, что модальное окно закрылось
      cy.getCy('modal-overlay').should('not.exist');

      // Проверяем, что название колонки не изменилось
      cy.getCy(`column-title-${NAME_COLUMN}`).should('contain.text', `${NAME_COLUMN}`);
    });
    it('должна предотвращать удаление последней колонки', () => {
      // Предполагаем, что есть только одна колонка по умолчанию
      // Пытаемся удалить её
      cy.getCy(`delete-column-button-${NAME_COLUMN}`).click();
      cy.getCy(`confirm-modal-confirm-button`).click();
      cy.getCy('delete-column-button-backlog').click();

      // Проверяем, что появилось сообщение об ошибке
      cy.getCy('modal-overlay').should('be.visible');
      cy.getCy('confirm-modal-message').should('contain.text', 'Нельзя удалить последнюю колонку');

      // Закрываем модальное окно
      cy.getCy('confirm-modal-cancel-button').click();
    });
  });
});
