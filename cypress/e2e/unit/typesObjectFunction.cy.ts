/// <reference types="cypress" />

import { typedEntries } from '../../../src/helper/typesObjectFunction';

describe('typedEntries', () => {
  it('возвращает пары ключ-значение с сохранением порядка вставки', () => {
    const obj = { a: 1, b: 'x', c: true } as const;
    const entries = typedEntries(obj);

    expect(entries).to.deep.equal([
      ['a', 1],
      ['b', 'x'],
      ['c', true],
    ]);
  });

  it('возвращает пустой массив для пустого объекта', () => {
    const obj = {};
    const entries = typedEntries(obj);
    expect(entries).to.deep.equal([]);
  });

  it('работает с разными типами значений (null, undefined, Date, function)', () => {
    const fn = () => 42;
    const d = new Date('2020-01-01T00:00:00Z');
    const obj = { a: null, b: undefined, c: d, d: fn } as const;
    const entries = typedEntries(obj as any);

    expect(entries[0][0]).to.equal('a');
    expect(entries[0][1]).to.equal(null);
    expect(entries[1][0]).to.equal('b');
    expect(entries[1][1]).to.equal(undefined);
    expect(entries[2][0]).to.equal('c');
    expect(entries[2][1]).to.equal(d);
    expect(entries[3][0]).to.equal('d');
    expect(entries[3][1]).to.equal(fn);
  });

  it('корректно обрабатывает числовые ключи: integer-ключи идут по возрастанию', () => {
    const obj: Record<string, string> = { 2: 'b', 1: 'a', a: 'x' };
    const entries = typedEntries(obj);
    expect(entries).to.deep.equal([
      ['1', 'a'],
      ['2', 'b'],
      ['a', 'x'],
    ]);
  });

  it('сохраняет порядок при динамическом добавлении свойств', () => {
    const obj: Record<string, number> = {};
    obj.x = 10;
    obj.y = 20;
    const entries = typedEntries(obj);
    expect(entries).to.deep.equal([
      ['x', 10],
      ['y', 20],
    ]);
  });
});
