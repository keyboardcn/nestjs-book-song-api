import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';
import { getModelToken } from '@nestjs/sequelize';
import { Author } from 'src/models/author.model';
import { find } from 'rxjs';

const mockAuthorModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
};

describe('AuthorsService', () => {
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getModelToken(Author),
          useValue: mockAuthorModel,
        },
        {
          provide: APP_KEY_TOKEN,
          useValue: 'test-api-key',
        },
      ],
    }).compile();
    authorsService = moduleRef.get<AuthorsService>(AuthorsService);
  });

  describe('findByLastName', () => {
    it('should return an array of authors for a given last name', async () => {
      const lastName = 'Doe';
      const mockAuthors = [
        { id: 1, firstname: 'John', lastname: lastName },
        { id: 2, firstname: 'Jane', lastname: lastName },
      ];
      mockAuthorModel.findAll.mockResolvedValue(mockAuthors);
      const result = await authorsService.findByLastName(lastName);
      expect(result).toBe(mockAuthors);
      expect(mockAuthorModel.findAll).toHaveBeenCalledWith({
        where: { lastname: lastName as any },
      });
    });
  });

  describe('findAuthorBooks', () => {
    it('should return an array of books for a given author id', async () => {
      const authorId = 1;
      const mockBooks = [
        { id: 1, title: 'Book One', author_id: authorId },
        { id: 2, title: 'Book Two', author_id: authorId },
      ];
      const mockAuthor = {
        id: authorId,
        firstname: 'John',
        lastname: 'Doe',
        books: mockBooks,
      };
      mockAuthorModel.findByPk = jest.fn().mockResolvedValue(mockAuthor);
      const result = await authorsService.findAuthorBooks(authorId);
      expect(result).toBe(mockBooks);
      expect(mockAuthorModel.findByPk).toHaveBeenCalledWith(authorId, {
        include: [{ all: true }],
        raw: false,
        nest: true,
      });
    });
  });
});
