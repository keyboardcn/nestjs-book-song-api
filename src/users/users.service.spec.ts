import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';
import { User } from 'src/models/user.model';

const mockUserModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
};
describe('UsersService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
        {
          provide: APP_KEY_TOKEN,
          useValue: 'test-api-key',
        },
      ],
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
  });
  describe('findByLastName', () => {
    it('should return an array of authors for a given last name', async () => {
      const lastName = 'Doe';
      const mockAuthors = [
        { id: 1, firstname: 'John', lastname: lastName },
        { id: 2, firstname: 'Jane', lastname: lastName },
      ];
      mockUserModel.findAll.mockResolvedValue(mockAuthors);
      const result = await usersService.findByLastName(lastName);
      expect(result).toBe(mockAuthors);
      expect(mockUserModel.findAll).toHaveBeenCalledWith({
        where: { lastname: lastName as any },
      });
    });
  });
});
