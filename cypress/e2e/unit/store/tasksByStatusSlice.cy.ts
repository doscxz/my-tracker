/// <reference types="cypress" />

import reducer, {
  addStatus,
  removeStatus,
  createTask,
  removeTask,
  moveTask,
  distributeTasksByStatus,
  editedFiled,
} from '../../../../src/store/slices/tasksByStatusSlice';

import { Priority, Task } from '../../../../src/constant/@type';

type State = ReturnType<typeof reducer>;

const makeTask = (over: Partial<Task> = {}): Task => ({
  id: over.id ?? 1,
  title: over.title ?? 'T',
  status: over.status ?? 'backlog',
  description: over.description ?? '',
  details: over.details ?? { type: '', priority: Priority.LOW, tags: '' },
  comments: over.comments ?? [],
});

describe('tasksByStatusSlice reducers', () => {
  it('addStatus добавляет пустую колонку', () => {
    const next = reducer(undefined, addStatus('in-progress'));
    expect(Object.keys(next)).to.include('in-progress');
    expect(next['in-progress']).to.deep.equal([]);
  });

  it('removeStatus удаляет колонку', () => {
    let state = reducer(undefined, addStatus('test'));
    state = reducer(state, removeStatus('test'));
    expect(Object.keys(state)).to.not.include('test');
  });

  it('createTask добавляет задачу в указанный статус', () => {
    let state = reducer(undefined, addStatus('backlog'));
    state = reducer(
      state,
      createTask({
        title: 'X',
        status: 'backlog',
        description: 'd',
        type: '',
        priority: Priority.LOW,
        tag: '',
      })
    );
    expect(state.backlog.length).to.equal(1);
    expect(state.backlog[0]?.title).to.equal('X');
  });

  it('removeTask удаляет задачу по id', () => {
    let state: State = { backlog: [makeTask({ id: 7 })] };
    state = reducer(state, removeTask({ status: 'backlog', taskId: 7 }));
    expect(state.backlog).to.have.length(0);
  });

  it('moveTask переносит задачу между колонками', () => {
    let state: State = { backlog: [makeTask({ id: 3 })], done: [] };
    state = reducer(state, moveTask({ taskId: 3, fromStatus: 'backlog', toStatus: 'done' }));
    expect(state.backlog).to.have.length(0);
    expect(state.done).to.have.length(1);
    expect(state.done[0]?.id).to.equal(3);
  });

  it('editedFiled изменяет поля задачи и вложенные details', () => {
    let state: State = {
      backlog: [
        makeTask({
          id: 9,
          title: 'Old',
          details: { type: 'A', priority: Priority.LOW, tags: 'z' },
        }),
      ],
    };
    state = reducer(
      state,
      editedFiled({ id: 9, statusTask: 'backlog', keyField: 'title', value: 'New' })
    );
    expect(state.backlog[0]?.title).to.equal('New');
    state = reducer(
      state,
      editedFiled({ id: 9, statusTask: 'backlog', keyField: 'priority', value: 'Высокий' })
    );
    expect(state.backlog[0]?.details.priority).to.equal('Высокий');
  });

  it('distributeTasksByStatus группирует задачи по статусам', () => {
    const tasks = [
      makeTask({ id: 1, status: 'backlog' }),
      makeTask({ id: 2, status: 'done' }),
      makeTask({ id: 3, status: 'done' }),
    ];
    let state = reducer(undefined, addStatus('done'));
    state = reducer(state, distributeTasksByStatus({ tasks }));
    expect(state.backlog.map((t) => t?.id)).to.deep.equal([1]);
    expect(state.done.map((t) => t?.id)).to.deep.equal([2, 3]);
  });

  it('removeTask не изменяет состояние при несуществующем id', () => {
    let state: State = { backlog: [makeTask({ id: 1 }), makeTask({ id: 2 })] };
    const prev = JSON.parse(JSON.stringify(state));
    state = reducer(state, removeTask({ status: 'backlog', taskId: 999 }));
    expect(state).to.deep.equal(prev);
  });

  it('moveTask ничего не делает, если задачи с id нет в fromStatus', () => {
    let state: State = { backlog: [makeTask({ id: 1 })], done: [] };
    const prev = JSON.parse(JSON.stringify(state));
    state = reducer(state, moveTask({ taskId: 999, fromStatus: 'backlog', toStatus: 'done' }));
    expect(state).to.deep.equal(prev);
  });

  it('moveTask внутри одной и той же колонки не дублирует задачу (corner case)', () => {
    let state: State = { backlog: [makeTask({ id: 5 }), makeTask({ id: 6 })] };
    state = reducer(state, moveTask({ taskId: 5, fromStatus: 'backlog', toStatus: 'backlog' }));
    expect(state.backlog.filter((t) => t?.id === 5)).to.have.length(1);
    // задача с id 5 перемещается в конец колонки
    expect(state.backlog.map((t) => t?.id)).to.deep.equal([6, 5]);
  });

  it('editedFiled не изменяет состояние при несуществующем id', () => {
    let state: State = { backlog: [makeTask({ id: 10, title: 'Keep' })] };
    const prev = JSON.parse(JSON.stringify(state));
    state = reducer(
      state,
      editedFiled({ id: 999, statusTask: 'backlog', keyField: 'title', value: 'Nope' })
    );
    expect(state).to.deep.equal(prev);
  });

  it('distributeTasksByStatus при undefined tasks не меняет состояние (negative)', () => {
    let state = reducer(undefined, addStatus('done'));
    state = reducer(
      { ...state, backlog: [makeTask({ id: 1 })], done: [makeTask({ id: 2 })] },
      distributeTasksByStatus({ tasks: undefined })
    );
    expect(state.backlog.map((t) => t?.id)).to.deep.equal([1]);
    expect(state.done.map((t) => t?.id)).to.deep.equal([2]);
  });

  it('distributeTasksByStatus создаёт отсутствующие статусы и распределяет задачи (corner)', () => {
    const tasks = [
      makeTask({ id: 1, status: 'backlog' }),
      makeTask({ id: 2, status: 'in-review' }),
    ];
    let state = reducer(undefined, addStatus('backlog'));
    state = reducer(state, distributeTasksByStatus({ tasks }));
    expect(state.backlog.map((t) => t?.id)).to.deep.equal([1]);
    expect(state['in-review'].map((t) => t?.id)).to.deep.equal([2]);
  });

  it('addStatus поверх существующего статуса перезаписывает колонку на пустую (corner)', () => {
    let state: State = { backlog: [makeTask({ id: 1 })] };
    state = reducer(state, addStatus('backlog'));
    expect(state.backlog).to.deep.equal([]);
  });
});
