import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateUserUseCase, CreateUserInput } from '../CreateUserUseCase';
import { IUserRepository } from '../../repositories/IUserRepository';
import { User } from '../../entities/User';
import { UserRole } from '../../../../generated/prisma';

const mockUserRepo: IUserRepository = {
  findByEmail: vi.fn(),
  createUser: vi.fn(),
};

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new CreateUserUseCase(mockUserRepo);
  });

  it('deve lançar erro se email já existe', async () => {
    vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(
      new User({ id: '1', name: 'x', email: 'a@b.com', password: 'pwd', role: UserRole.ADMIN, organizationId: 'org1' })
    );

    const input: CreateUserInput = {
      name: 'Test',
      email: 'a@b.com',
      password: '1234',
      role: UserRole.ADMIN,
      organizationId: 'org1',
    };

    await expect(useCase.execute(input)).rejects.toThrow('Email already exists');
    expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('a@b.com');
    expect(mockUserRepo.createUser).not.toHaveBeenCalled();
  });

  it('deve fazer hash da senha e criar usuário', async () => {
    vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(null);
    vi.mocked(mockUserRepo.createUser).mockImplementation(async (data) => {
      return new User({
        id: 'new-id',
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    const input: CreateUserInput = {
      name: 'Test',
      email: 'new@user.com',
      password: 'plainpwd',
      role: UserRole.ADMIN,
      organizationId: 'org1',
    };

    const user = await useCase.execute(input);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('new-id');
    expect(user.password).not.toBe('plainpwd');
    expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('new@user.com');
    expect(mockUserRepo.createUser).toHaveBeenCalled();
  });
});
