import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';

describe('BooksService', () => {
  let booksService: BooksService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
            provide: APP_KEY_TOKEN,
            useValue: 'test-api-key',
        }
    ],
    }).compile();
    booksService = moduleRef.get<BooksService>(BooksService);
  });
  
  describe('findAll', () => {
      it('should be return an array of books', async () => {
        const books = booksService.findAll();
        expect(books).toBeDefined();
        expect(Array.isArray(books)).toBe(true);
        expect(books.length).toBeGreaterThan(0);
        expect(books[0]).toHaveProperty('id');
        expect(books[0]).toHaveProperty('title'); 
        expect(books[0]['author']).toBe('George Orwell');
      });
  });

  describe('findOne', () => {
      it('should return a single book by id', async () => {
        const book = booksService.findOne(1);
        expect(book).toBeDefined();
        expect(book).toHaveProperty('id', 1);
        expect(book).toHaveProperty('title', '1984');
      });

      it('should return undefined for non-existing book', async () => {
        const book = booksService.findOne(999);
        expect(book).toBeUndefined();
      });
    });
});