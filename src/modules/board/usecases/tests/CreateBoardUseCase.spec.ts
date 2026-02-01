import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateBoardUseCase } from '../CreateBoardUseCase';
import { IBoardRepository } from '../../repositories/IBoardRepository';

const mockBoardRepo: IBoardRepository = {
  create: vi.fn(),
  findById: vi.fn(),
  findManyByOrganization: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('CreateBoardUseCase', () => {
  let useCase: CreateBoardUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new CreateBoardUseCase(mockBoardRepo);
  });

  it('deve criar board com sucesso', async () => {
    const input = {
      name: 'Meu Board',
      color: '#ff0000',
      organizationId: 'org-1',
    };

    const createdBoard = {
      id: 'board-1',
      ...input,
      updatedAt: new Date(),
    };

    vi.mocked(mockBoardRepo.create).mockResolvedValue(createdBoard);

    const result = await useCase.execute(input);

    expect(result).toEqual(createdBoard);
    expect(mockBoardRepo.create).toHaveBeenCalledWith(input);
  });
});
