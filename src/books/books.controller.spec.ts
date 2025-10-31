import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
                BooksService,
                {
                    provide: APP_KEY_TOKEN,
                    useValue: 'test-api-key',
                }
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  it('should return an array of books', () => {
    const result = [
      { id: 1, title: '1984', author: 'George Orwell', publishedYear: 1949 },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        publishedYear: 1960,
      },
    ];
    jest.spyOn(booksService, 'findAll').mockImplementation(() => result);

    expect(booksController.findAll()).toBe(result);
  });
});
