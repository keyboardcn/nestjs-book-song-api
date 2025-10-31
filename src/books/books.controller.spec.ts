import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';
import { create } from 'domain';

const mockBookService = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  findByAuthor: jest.fn(),
  create: jest.fn(),
};

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: BooksService,
          useValue: mockBookService,
        },
        {
          provide: APP_KEY_TOKEN,
          useValue: 'test-api-key',
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  it('should return an array of books', () => {
    const expectedResult = [
      { id: 1, title: 'Book One' },
      { id: 2, title: 'Book Two' },
    ];
    mockBookService.findAll.mockReturnValue(expectedResult);
    expect(booksController.findAll()).toBe(expectedResult);
  });

  describe('create', () => {
    it('should call booksService.create with the correct data', async () => {
      const newBook = { title: 'New Book', author: 'Author Name' };
      mockBookService.create.mockResolvedValue({ id: 2, ...newBook });

      await booksController.create(newBook as any);
      expect(mockBookService.create).toHaveBeenCalledWith(newBook);
    });
  });
});
