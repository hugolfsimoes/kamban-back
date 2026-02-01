import { describe, it, expect } from 'vitest';
import { reorderPositions } from './reorderPositions';

describe('reorderPositions', () => {
  it('deve retornar posições inalteradas quando sourceIndex === destinationIndex', () => {
    const items = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];

    const result = reorderPositions(items, 0, 0);

    expect(result).toEqual([
      { id: 'a', position: 0 },
      { id: 'b', position: 1 },
      { id: 'c', position: 2 },
    ]);
  });

  it('deve mover item para frente (sourceIndex > destinationIndex)', () => {
    const items = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];

    const result = reorderPositions(items, 2, 0);

    expect(result).toEqual([
      { id: 'c', position: 0 },
      { id: 'a', position: 1 },
      { id: 'b', position: 2 },
    ]);
  });

  it('deve mover item para trás (sourceIndex < destinationIndex)', () => {
    const items = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];

    const result = reorderPositions(items, 0, 2);

    expect(result).toEqual([
      { id: 'b', position: 0 },
      { id: 'c', position: 1 },
      { id: 'a', position: 2 },
    ]);
  });

  it('deve mover item para posição adjacente', () => {
    const items = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];

    const result = reorderPositions(items, 0, 1);

    expect(result).toEqual([
      { id: 'b', position: 0 },
      { id: 'a', position: 1 },
      { id: 'c', position: 2 },
    ]);
  });

  it('deve funcionar com um único item', () => {
    const items = [ { id: 'a' } ];

    const result = reorderPositions(items, 0, 0);

    expect(result).toEqual([ { id: 'a', position: 0 } ]);
  });

  it('deve funcionar com itens que têm mais propriedades', () => {
    const items = [
      { id: 'col-1', title: 'A' },
      { id: 'col-2', title: 'B' },
    ];

    const result = reorderPositions(items, 0, 1);

    expect(result).toEqual([
      { id: 'col-2', position: 0 },
      { id: 'col-1', position: 1 },
    ]);
  });
});
