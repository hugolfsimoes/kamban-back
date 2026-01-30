
export function reorderPositions<T extends { id: string; }>(
  items: T[],
  sourceIndex: number,
  destinationIndex: number
): { id: string; position: number; }[] {
  if (sourceIndex === destinationIndex) {
    return items.map((item, index) => ({ id: item.id, position: index }));
  }

  const result = [ ...items ];
  const [ removed ] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result.map((item, index) => ({ id: item.id, position: index }));
}
