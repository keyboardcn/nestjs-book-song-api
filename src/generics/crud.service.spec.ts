import { CrudService } from './crud.service';
import { ModelCtor } from 'sequelize-typescript';

class MockModelInstance {
  static findAll = jest.fn();
  static findByPk = jest.fn();
  static create = jest.fn();
  static update = jest.fn();
  static destroy = jest.fn();
  save = jest.fn();
  constructor(data: any) {
    Object.assign(this, data);
  }
}

const mockData = { id: 1, title: 'Test Book', author: 'Test Author' };
const mockDataArray = [
  mockData,
  { id: 2, title: 'Another Book', author: 'Another Author' },
];

describe('CrudService', () => {
  let crudService: CrudService<any>;

  beforeEach(() => {
    crudService = new CrudService(
      MockModelInstance as unknown as ModelCtor<any>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all records', async () => {
    MockModelInstance.findAll.mockResolvedValue(mockDataArray);
    const result = await crudService.findAll();
    expect(result).toBe(mockDataArray);
    expect(MockModelInstance.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one record by id', async () => {
    MockModelInstance.findByPk.mockResolvedValue(mockData);
    const result = await crudService.findByPk(1);
    expect(result).toBe(mockData);
    expect(MockModelInstance.findByPk).toHaveBeenCalledWith(1);
  });
  describe('create', () => {
    it('should create a new record', async () => {
      MockModelInstance.create.mockResolvedValue(mockData);
      const result = await crudService.create({
        title: 'Test Book',
        author: 'Test Author',
      });
      expect(result).toEqual(mockData);
      expect(MockModelInstance.create).toHaveBeenCalledWith({
        title: 'Test Book',
        author: 'Test Author',
      });
    });
  });
  describe('update', () => {
    it('should update an existing record', async () => {
      const instance = new MockModelInstance(mockData);
      MockModelInstance.findByPk = jest.fn().mockResolvedValue(instance);
      instance.save.mockResolvedValue({ ...mockData, title: 'Updated Title' });

      const result = await crudService.update(1, { title: 'Updated Title' });
      expect(result).toEqual({ ...mockData, title: 'Updated Title' });
      expect(MockModelInstance.findByPk).toHaveBeenCalledWith(1);
      expect(instance.save).toHaveBeenCalledTimes(1);
    });
    it('should return null if record to update does not exist', async () => {
      MockModelInstance.findByPk = jest.fn().mockResolvedValue(null);
      const result = await crudService.update(999, { title: 'Updated Title' });
      expect(result).toBeNull();
      expect(MockModelInstance.findByPk).toHaveBeenCalledWith(999);
    });
  });

  describe('delete', () => {
    it('should delete an existing record', async () => {
      MockModelInstance.destroy = jest.fn().mockResolvedValue(1);
      const result = await crudService.delete(1);
      expect(result).toBe(true);
      expect(MockModelInstance.destroy).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
    it('should return false if record to delete does not exist', async () => {
      MockModelInstance.destroy = jest.fn().mockResolvedValue(0);
      const result = await crudService.delete(999);
      expect(result).toBe(false);
      expect(MockModelInstance.destroy).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });
});
