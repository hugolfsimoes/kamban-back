import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UpdateColumnUseCase } from '../UpdateColumnUseCase';
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

describe('UpdateColumnUseCase', () => {
  let useCase: UpdateColumnUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new UpdateColumnUseCase(mockBoardRepo, mockColumnRepo);
  });

  it('deve lançar NotFoundError quando coluna não existe', async () => {
    vi.mocked(mockColumnRepo.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({
        columnId: 'col-1',
        organizationId: 'org-1',
        data: { title: 'Novo Título' },
      })
    ).rejects.toThrow('Coluna não encontrada');
  });

  it('deve lançar erro quando não informa title nem position', async () => {
    vi.mocked(mockColumnRepo.findById).mockResolvedValue({
      id: 'col-1',
      title: 'Coluna',
      boardId: 'board-1',
      position: 0,
      updatedAt: new Date(),
    });
    vi.mocked(mockBoardRepo.findById).mockResolvedValue({
      id: 'board-1',
      name: 'Board',
      color: '#000',
      organizationId: 'org-1',
      updatedAt: new Date(),
    });

    await expect(
      useCase.execute({
        columnId: 'col-1',
        organizationId: 'org-1',
        data: {},
      })
    ).rejects.toThrow('É necessário informar title ou position para atualizar');
  });

  it('deve atualizar coluna com sucesso', async () => {
    vi.mocked(mockColumnRepo.findById).mockResolvedValue({
      id: 'col-1',
      title: 'Coluna',
      boardId: 'board-1',
      position: 0,
      updatedAt: new Date(),
    });
    vi.mocked(mockBoardRepo.findById).mockResolvedValue({
      id: 'board-1',
      name: 'Board',
      color: '#000',
      organizationId: 'org-1',
      updatedAt: new Date(),
    });

    const updated = {
      id: 'col-1',
      title: 'Coluna Atualizada',
      boardId: 'board-1',
      position: 0,
      updatedAt: new Date(),
    };
    vi.mocked(mockColumnRepo.update).mockResolvedValue(updated);

    const result = await useCase.execute({
      columnId: 'col-1',
      organizationId: 'org-1',
      data: { title: 'Coluna Atualizada' },
    });

    expect(result.title).toBe('Coluna Atualizada');
    expect(mockColumnRepo.update).toHaveBeenCalledWith('col-1', { title: 'Coluna Atualizada' });
  });
});
