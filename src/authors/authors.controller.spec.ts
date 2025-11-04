import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';
import { CacheModule } from '@nestjs/cache-manager';

const mockAuthorsService = {
  findAuthorBooks: jest.fn(),
  create: jest.fn(),
};

describe('AuthorsController', () => {
  let authorsController: AuthorsController;
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({ttl: 5000})],
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: mockAuthorsService,
        },
        {
          provide: APP_KEY_TOKEN,
          useValue: 'test-api-key',
        },
      ],
    }).compile();

    authorsController = module.get<AuthorsController>(AuthorsController);
    authorsService = module.get<AuthorsService>(AuthorsService);
  });

  describe('findAuthorBooks', () => {
    it('should return an array of books for a given author id', async () => {
      const authorId = 1;
      const mockBooks = [
        { id: 1, title: 'Book One', author_id: authorId },
        { id: 2, title: 'Book Two', author_id: authorId },
      ];
      mockAuthorsService.findAuthorBooks.mockResolvedValue(mockBooks);

      const result = await authorsController.findAuthorBooks(authorId);
      expect(result).toBe(mockBooks);
      expect(mockAuthorsService.findAuthorBooks).toHaveBeenCalledWith(authorId);
    });
  });

  describe('create', () => {
    it('should call authorsService.create with the correct data', async () => {

      const newAuthor = { firstname: 'New', lastname: 'Author' };
      mockAuthorsService.create.mockResolvedValue({ id: 2, ...newAuthor });

      await authorsController.create(newAuthor as any);
      expect(mockAuthorsService.create).toHaveBeenCalledWith(newAuthor);
    });
  });
});
