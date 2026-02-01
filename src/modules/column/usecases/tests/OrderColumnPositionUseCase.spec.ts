import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OrderColumnPositionUseCase } from '../OrderColumnPositionUseCase';
import { IBoardRepository } from '../../../board/repositories/IBoardRepository';
import { IColumnRepository } from '../../repositories/IColumnRepository';

const mockBoardRepo: IBoardRepository = {
  create: vi.fn(),
  findById: vi.fn(),
  findManyByOrganization: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockColumnRepo: IColumnRepository = {
  findManyByBoardId: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('OrderColumnPositionUseCase', () => {
  let useCase: OrderColumnPositionUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new OrderColumnPositionUseCase(mockBoardRepo, mockColumnRepo);
  });

  it('deve lançar NotFoundError quando board não existe', async () => {
    vi.mocked(mockBoardRepo.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({
        boardId: 'board-1',
        organizationId: 'org-1',
        sourcePosition: 0,
        destinationPosition: 1,
      })
    ).rejects.toThrow('Board não encontrado');
  });

  it('deve retornar columns sem alterações quando source === destination', async () => {
    const columns = [
      { id: 'c1', title: 'A', boardId: 'b1', position: 0, updatedAt: new Date() },
      { id: 'c2', title: 'B', boardId: 'b1', position: 1, updatedAt: new Date() },
    ];

    vi.mocked(mockBoardRepo.findById).mockResolvedValue({
      id: 'b1',
      name: 'Board',
      color: '#000',
      organizationId: 'org-1',
      updatedAt: new Date(),
    });
    vi.mocked(mockColumnRepo.findManyByBoardId).mockResolvedValue(columns);

    const result = await useCase.execute({
      boardId: 'b1',
      organizationId: 'org-1',
      sourcePosition: 0,
      destinationPosition: 0,
    });

    expect(result).toEqual(columns);
    expect(mockColumnRepo.update).not.toHaveBeenCalled();
  });

  it('deve reordenar columns e chamar update', async () => {
    const columns = [
      { id: 'c1', title: 'A', boardId: 'b1', position: 0, updatedAt: new Date() },
      { id: 'c2', title: 'B', boardId: 'b1', position: 1, updatedAt: new Date() },
    ];

    vi.mocked(mockBoardRepo.findById).mockResolvedValue({
      id: 'b1',
      name: 'Board',
      color: '#000',
      organizationId: 'org-1',
      updatedAt: new Date(),
    });
    vi.mocked(mockColumnRepo.findManyByBoardId)
      .mockResolvedValueOnce(columns)
      .mockResolvedValueOnce([
        { id: 'c2', title: 'B', boardId: 'b1', position: 0, updatedAt: new Date() },
        { id: 'c1', title: 'A', boardId: 'b1', position: 1, updatedAt: new Date() },
      ]);

    const result = await useCase.execute({
      boardId: 'b1',
      organizationId: 'org-1',
      sourcePosition: 0,
      destinationPosition: 1,
    });

    expect(mockColumnRepo.update).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });
});
