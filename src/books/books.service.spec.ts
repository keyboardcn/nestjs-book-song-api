import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';
import { getModelToken } from '@nestjs/sequelize';
import { Book } from 'src/models/book.model';

const mockBookModel = {
  findAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
};

describe('BooksService', () => {
  let booksService: BooksService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book),
          useValue: mockBookModel,
        },
        {
          provide: APP_KEY_TOKEN,
          useValue: 'test-api-key',
        },
      ],
    }).compile();
    booksService = moduleRef.get<BooksService>(BooksService);
  });

  describe('findByAuthor', () => {
    it('should return an array of books for a given author', async () => {
      const authorId = 1;
      const mockBooks = [
        { id: 1, title: 'Book One', author_id: authorId },
        { id: 2, title: 'Book Two', author_id: authorId },
      ];
      mockBookModel.findAll.mockResolvedValue(mockBooks);

      const result = await booksService.findByAuthor(authorId);
      expect(result).toBe(mockBooks);
      expect(mockBookModel.findAll).toHaveBeenCalledWith({
        where: { author_id: authorId as any },
      });
    });
  });
});
