// src/modules/auth/usecases/__tests__/LoginUserUseCase.spec.ts
import { LoginUserUseCase, LoginUserInput } from '../LoginUserUseCase';
import { IUserRepository } from '../../../user/repositories/IUserRepository';
import { User } from '../../../user/entities/User';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const mockUserRepo: jest.Mocked<IUserRepository> = {
  findByEmail: jest.fn(),
  createUser: jest.fn(),
};

describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;
  const plainPassword = 'secret';
  const hashedPassword = bcrypt.hashSync(plainPassword, 1);

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new LoginUserUseCase(mockUserRepo);
  });

  it('should throw on invalid email', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);
    await expect(useCase.execute({ email: 'x@x.com', password: 'any' })).rejects.toThrow('Invalid credentials');
  });

  it('should throw on wrong password', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(
      new User({ id: '1', name: 'u', email: 'u@u.com', password: hashedPassword, role: UserRole.ADMIN, organizationId: 'org1' })
    );
    await expect(useCase.execute({ email: 'u@u.com', password: 'wrong' })).rejects.toThrow('Invalid credentials');
  });

  it('should return user and token on success', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(
      new User({ id: '1', name: 'u', email: 'u@u.com', password: hashedPassword, role: UserRole.ADMIN, organizationId: 'org1' })
    );

    const result = await useCase.execute({ email: 'u@u.com', password: plainPassword });
    expect(result.user).toBeInstanceOf(User);
    expect(typeof result.token).toBe('string');
    expect(result.token.split('.')).toHaveLength(3);
  });
});
