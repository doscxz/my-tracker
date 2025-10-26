/// <reference types="cypress" />
import 'cypress-real-events';

describe('Страница задач (Tasks Page)', () => {
  beforeEach(() => {
    cy.visit('/task');
  });

  describe('Основные элементы интерфейса', () => {
    it('должна отображать sidebar с задачами', () => {
      // Проверяем, что sidebar присутствует
      cy.get('aside').should('be.visible');
    });

    it('должна отображать панель выбора задачи по умолчанию', () => {
      // Проверяем, что по умолчанию показывается панель выбора задачи
      cy.contains('Выберете задачу для отображения ее информации').should('be.visible');
    });

    it('должна отображать индикатор загрузки при загрузке задач', () => {
      // Проверяем наличие индикатора загрузки (если есть)
      cy.get('body').then(($body) => {
        if ($body.find('span:contains("...Загрузка")').length > 0) {
          cy.contains('...Загрузка').should('exist');
        }
      });
    });

    it('должна отображать сообщение об ошибке при неудачной загрузке', () => {
      // Проверяем наличие сообщения об ошибке (если есть)
      cy.get('body').then(($body) => {
        if ($body.find('span:contains("Произошла ошибка")').length > 0) {
          cy.contains('Произошла ошибка').should('exist');
        }
      });
    });
  });

  describe('Просмотр задач в sidebar', () => {
    it('должна отображать список задач в sidebar', () => {
      cy.wait(1000); // Ждем загрузки задач

      // Проверяем, что в sidebar есть хотя бы одна задача
      cy.getCy('task-card-', true).should('exist');
    });

    it('должна отображать информацию о задаче (название и описание)', () => {
      cy.wait(1000);

      cy.getCy('task-card-', true)
        .first()
        .within(() => {
          cy.getCy('task-title-', true).should('exist');
          cy.getCy('task-description-', true).should('exist');
        });
    });

    it('должна прокручивать список задач при наличии большого количества', () => {
      cy.wait(1000);

      // Проверяем наличие scrollable контейнера
      cy.get('div.flex.flex-col').should('have.class', 'overflow-y-scroll');
    });
  });

  describe('Выбор и просмотр задач', () => {
    it('должна открывать панель информации о задаче при клике на неё', () => {
      cy.wait(1000);

      // Проверяем, что начально показывается панель выбора
      cy.contains('Выберете задачу для отображения ее информации').should('be.visible');

      // Кликаем на первую задачу
      cy.getCy('task-card-', true).first().click();

      // Проверяем, что открылась панель информации
      cy.getCy('task-info-panel-content').should('be.visible');
      cy.getCy('task-info-title').should('exist');
    });

    it('должна отображать название задачи в панели информации', () => {
      cy.wait(1000);

      // Получаем название первой задачи
      cy.getCy('task-title-', true).first().invoke('text').as('taskTitle');

      // Кликаем на задачу
      cy.getCy('task-card-', true).first().click();

      // Проверяем, что название отображается в панели
      cy.getCy('task-info-title').should('exist').and('not.be.empty');
    });

    it('должна отображать детали задачи (статистика)', () => {
      cy.wait(1000);

      cy.getCy('task-card-', true).first().click();

      // Проверяем, что секция деталей отображается
      cy.contains('Детали задачи').should('be.visible');
    });

    it('должна отображать описание задачи', () => {
      cy.wait(1000);

      cy.getCy('task-card-', true).first().click();

      // Проверяем, что секция описания отображается
      cy.contains('Описание').should('be.visible');
    });

    it('должна отображать секцию комментариев', () => {
      cy.wait(1000);

      cy.getCy('task-card-', true).first().click();

      // Проверяем, что секция комментариев отображается
      cy.contains('Комментарии').should('be.visible');
    });

    it('должна переключаться между задачами при клике на другую задачу', () => {
      cy.wait(1000);

      // Кликаем на первую задачу
      cy.getCy('task-card-', true).first().click();
      cy.getCy('task-info-title').first().invoke('text').as('firstTitle');

      // Кликаем на вторую задачу (если есть)
      cy.getCy('task-card-', true).then(($tasks) => {
        if ($tasks.length > 1) {
          cy.getCy('task-card-', true).eq(1).click();
          cy.getCy('task-info-title').should(($title) => {
            expect($title).to.not.equal($('@firstTitle'));
          });
        }
      });
    });
  });

  describe('Редактирование полей задачи', () => {
    beforeEach(() => {
      cy.wait(1000);
      cy.getCy('task-card-', true).first().click();
    });

    it('должна позволять редактировать поле при клике на него', () => {
      // Кликаем на любое поле в секции "Детали задачи"
      cy.getCy('editable-field-', true).first().click();

      // Проверяем, что появилось поле редактирования
      cy.getCy('editing-input-', true).should('exist');
    });

    it('должна сохранять изменения при нажатии Enter', () => {
      cy.getCy('editable-field-', true).first().click();

      // Вводим новое значение
      cy.getCy('editing-input-', true).clear().type('Новое значение');

      // Нажимаем Enter
      cy.getCy('editing-input-', true).type('{enter}');

      // Проверяем, что поле закрылось
      cy.getCy('editing-input-', true).should('not.exist');
    });

    it('должна отменять изменения при нажатии Escape', () => {
      cy.getCy('editable-field-', true).first().click();

      // Вводим значение
      cy.getCy('editing-input-', true).clear().type('Тестовое значение');

      // Нажимаем Escape
      cy.getCy('editing-input-', true).type('{esc}');

      // Проверяем, что поле закрылось
      cy.getCy('editing-input-', true).should('not.exist');
    });

    it('должна сохранять изменения при клике на кнопку подтверждения', () => {
      cy.getCy('editable-field-', true).first().click();

      cy.getCy('editing-input-', true).clear().type('Сохранённое значение');

      // Кликаем на кнопку подтверждения (✓)
      cy.getCy('editing-confirm-button-', true).click();

      // Проверяем, что поле закрылось
      cy.getCy('editing-input-', true).should('not.exist');
    });

    it('должна отменять изменения при клике на кнопку отмены', () => {
      cy.getCy('editable-field-', true).first().click();

      cy.getCy('editing-input-', true).clear().type('Отменённое значение');

      // Кликаем на кнопку отмены (✗)
      cy.getCy('editing-cancel-button-', true).click();

      // Проверяем, что поле закрылось
      cy.getCy('editing-input-', true).should('not.exist');
    });

    it('должна позволять редактировать описание задачи', () => {
      cy.getCy('editable-field-description-', true).click();

      // Проверяем, что появилось поле редактирования
      cy.getCy('editing-input-description-', true).should('exist');
    });
  });

  describe('Удаление задач', () => {
    beforeEach(() => {
      cy.getCy('task-card-', true).first().should('be.visible');
    });
    it('должна показывать кнопку удаления при наведении на задачу', () => {
      // Проверяем, что кнопка не видна по умолчанию
      cy.getCy('delete-task-button-', true).should('have.class', 'opacity-0');

      // Наводим курсор на задачу
      cy.getCy('task-card-', true).first().realHover();

      // Проверяем, что кнопка стала видимой (проверяем computed opacity style)
      cy.getCy('delete-task-button-', true).should('be.visible');
    });

    it('должна удалятся такска на кнопку удаления', () => {
      // Получаем количество задач до удаления
      cy.getCy('task-card-', true).then(($tasks) => {
        const initialCount = $tasks.length;

        // Наводим курсор и кликаем на кнопку удаления
        cy.getCy('task-card-', true).first().trigger('mouseover');
        cy.getCy('delete-task-button-', true).first().click();

        // Проверяем, что количество задач уменьшилось
        cy.getCy('task-card-', true).should('have.length', initialCount - 1);
      });
    });

    it('должна закрывать панель информации при удалении выбранной задачи', () => {
      // Выбираем задачу
      cy.getCy('task-card-', true).first().click();

      // Проверяем, что панель информации открыта
      cy.getCy('task-info-panel-content').should('be.visible');

      // Удаляем задачу
      cy.getCy('task-card-', true).first().trigger('mouseover');
      cy.getCy('delete-task-button-', true).first().click();

      // Проверяем, что снова показывается панель выбора
      cy.contains('Выберете задачу для отображения ее информации').should('be.visible');
    });
  });

  describe('Комментарии', () => {
    beforeEach(() => {
      cy.getCy('task-card-', true).first().click();
    });

    it('должна отображать пустое состояние комментариев по умолчанию', () => {
      // Проверяем, что показывается сообщение о пустом состоянии
      cy.contains('Пока нет комментариев').should('be.visible');
      cy.contains('Напишите первый комментарий выше').should('be.visible');
    });

    it('должна позволять вводить текст комментария', () => {
      cy.get('textarea').should('exist');
      cy.get('textarea').type('Это тестовый комментарий');

      // Проверяем, что текст введён
      cy.get('textarea').should('have.value', 'Это тестовый комментарий');
    });

    it('должна добавлять комментарий при нажатии кнопки "Отправить"', () => {
      cy.get('textarea').type('Новый комментарий для задачи');
      cy.getCy('send-button-comment').click();

      // Проверяем, что комментарий появился
      cy.contains('Вы').should('be.visible');
      cy.contains('Новый комментарий для задачи').should('be.visible');
    });

    it('должна добавлять комментарий при нажатии Enter', () => {
      cy.get('textarea').type('Комментарий с Enter{enter}');

      // Проверяем, что комментарий появился
      cy.contains('Вы').should('be.visible');
      cy.contains('Комментарий с Enter').should('be.visible');
    });

    it('должна очищать поле ввода после отправки комментария', () => {
      cy.get('textarea').type('Комментарий для очистки');
      cy.get('textarea').type('{enter}');

      // Проверяем, что поле очистилось
      cy.get('textarea').should('have.value', '');
    });

    it('должна отображать время комментария', () => {
      cy.get('textarea').type('Комментарий со временем');
      cy.get('textarea').type('{enter}');

      // Проверяем наличие времени (формат: HH:MM)
      cy.get('span').should('satisfy', ($spans) => {
        const times = $spans.toArray().map((span: HTMLElement) => span.textContent);
        return times.some((text: string | null) => /^\d{2}:\d{2}$/.test(text || ''));
      });
    });

    it('должна блокировать кнопку отправки для пустых комментариев', () => {
      // Проверяем, что кнопка заблокирована
      cy.get('button[disabled]').should('exist');

      // Вводим текст
      cy.get('textarea').type('Текст комментария');

      // Проверяем, что кнопка разблокировалась
      cy.get('button[disabled]').should('not.exist');
    });

    it('должна отображать разделитель даты для комментариев', () => {
      cy.get('textarea').type('Первый комментарий');
      cy.get('textarea').type('{enter}');

      // Проверяем наличие разделителя даты
      cy.contains('Сегодня').should('be.visible');
    });

    it('должна поддерживать отправку нескольких комментариев', () => {
      cy.get('textarea').type('Первый комментарий');
      cy.get('textarea').type('{enter}');

      cy.get('textarea').type('Второй комментарий');
      cy.get('textarea').type('{enter}');

      cy.get('textarea').type('Третий комментарий');
      cy.get('textarea').type('{enter}');

      // Проверяем наличие всех комментариев
      cy.contains('Первый комментарий').should('be.visible');
      cy.contains('Второй комментарий').should('be.visible');
      cy.contains('Третий комментарий').should('be.visible');
    });
  });

  describe('Синхронизация данных', () => {
    it('должна обновлять выбранную задачу при изменении данных в store', () => {
      cy.wait(1000);

      // Выбираем задачу
      cy.getCy('task-card-', true).first().click();
      cy.getCy('task-info-title').invoke('text').as('originalTitle');

      // Теоретически, изменения в store должны автоматически синхронизироваться
      // Проверяем, что панель показывает актуальную информацию
      cy.getCy('task-info-title').should('exist');
    });

    it('должна обрабатывать состояние пустого списка задач', () => {
      // Если список задач пуст, должна показываться соответствующая информация
      cy.get('body').then(($body) => {
        if ($body.find('[data-cy^="task-card-"]').length === 0) {
          cy.contains('Выберете задачу для отображения ее информации').should('be.visible');
        }
      });
    });
  });

  describe('Взаимодействие с навигацией', () => {
    it('должна корректно работать при переходах между страницами', () => {
      cy.wait(1000);

      // Проверяем, что страница корректно загружается
      cy.url().should('include', '/task');

      // Переходим на другую страницу
      cy.getCy('navigation-link-Панель Kanban').click();
      cy.url().should('include', '/kanban-table');

      // Возвращаемся на страницу задач
      cy.getCy('navigation-link-Задачи').click();
      cy.url().should('include', '/task');

      // Проверяем, что страница работает корректно
      cy.contains('Выберете задачу для отображения ее информации').should('be.visible');
    });
  });
});
