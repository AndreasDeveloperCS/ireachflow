import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { UserRole } from 'src/models/user.model';

describe('AuthService', () => {
  const dto = {
    organizationName: ' Nomado Innovations ',
    firstName: ' Andreas ',
    lastName: ' Petrov ',
    email: ' AAndreasPetrov@gmail.com ',
    password: 'password123',
  };

  let service: AuthService;
  let organizationModel: {
    create: jest.Mock;
    deleteOne: jest.Mock;
  };
  let usersService: {
    findByEmail: jest.Mock;
    create: jest.Mock;
    deleteById: jest.Mock;
  };
  let jwtService: {
    sign: jest.Mock;
  };

  beforeEach(() => {
    organizationModel = {
      create: jest.fn(),
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    };
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      deleteById: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    };
    jwtService = {
      sign: jest.fn(),
    };
    service = new AuthService(organizationModel as never, usersService as never, jwtService as never);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates an owner account with normalized values', async () => {
    const organization = { _id: 'org-1', ownerId: null, save: jest.fn().mockResolvedValue(undefined) };
    const user = {
      _id: 'user-1',
      email: 'aandreaspetrov@gmail.com',
      firstName: 'Andreas',
      lastName: 'Petrov',
      role: UserRole.OWNER,
      organizationId: 'org-1',
    };
    usersService.findByEmail.mockResolvedValue(null);
    organizationModel.create.mockResolvedValue(organization);
    usersService.create.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password' as never);

    const result = await service.register(dto);

    expect(usersService.findByEmail).toHaveBeenCalledWith('aandreaspetrov@gmail.com');
    expect(organizationModel.create).toHaveBeenCalledWith({
      name: 'Nomado Innovations',
      ownerId: null,
    });
    expect(usersService.create).toHaveBeenCalledWith({
      email: 'aandreaspetrov@gmail.com',
      passwordHash: 'hashed-password',
      firstName: 'Andreas',
      lastName: 'Petrov',
      role: UserRole.OWNER,
      organizationId: 'org-1',
    });
    expect(organization.ownerId).toBe('user-1');
    expect(organization.save).toHaveBeenCalled();
    expect(result).toBe(user);
  });

  it('converts duplicate-email races into a conflict and removes the new organization', async () => {
    const organization = { _id: 'org-1', ownerId: null, save: jest.fn() };
    usersService.findByEmail.mockResolvedValue(null);
    organizationModel.create.mockResolvedValue(organization);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password' as never);
    usersService.create.mockRejectedValue({ code: 11000 });

    await expect(service.register(dto)).rejects.toBeInstanceOf(ConflictException);

    expect(organizationModel.deleteOne).toHaveBeenCalledWith({ _id: 'org-1' });
    expect(usersService.deleteById).not.toHaveBeenCalled();
  });
});
