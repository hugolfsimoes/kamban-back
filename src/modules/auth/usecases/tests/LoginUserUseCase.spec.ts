import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LoginUserUseCase } from '../LoginUserUseCase';
import { IUserRepository } from '../../../user/repositories/IUserRepository';
import { User } from '../../../user/entities/User';
import bcrypt from 'bcryptjs';
import { UserRole } from '../../../../generated/prisma';

const mockUserRepo: IUserRepository = {
  findByEmail: vi.fn(),
  createUser: vi.fn(),
};

describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;
  const plainPassword = 'secret';
  const hashedPassword = bcrypt.hashSync(plainPassword, 1);

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new LoginUserUseCase(mockUserRepo);
  });

  it('deve lançar erro com email inválido', async () => {
    vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(null);
    await expect(useCase.execute({ email: 'x@x.com', password: 'any' })).rejects.toThrow('Credenciais inválidas');
  });

  it('deve lançar erro com senha errada', async () => {
    vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(
      new User({ id: '1', name: 'u', email: 'u@u.com', password: hashedPassword, role: UserRole.ADMIN, organizationId: 'org1' })
    );
    await expect(useCase.execute({ email: 'u@u.com', password: 'wrong' })).rejects.toThrow('Credenciais inválidas');
  });

  it('deve retornar user e token em caso de sucesso', async () => {
    vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(
      new User({ id: '1', name: 'u', email: 'u@u.com', password: hashedPassword, role: UserRole.ADMIN, organizationId: 'org1' })
    );

    const result = await useCase.execute({ email: 'u@u.com', password: plainPassword });
    expect(result.user).toMatchObject({ id: '1', name: 'u', email: 'u@u.com', organizationId: 'org1' });
    expect(result.user).not.toHaveProperty('password');
    expect(typeof result.token).toBe('string');
    expect(result.token.split('.')).toHaveLength(3);
  });
});
