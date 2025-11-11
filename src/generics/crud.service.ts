import { Injectable } from '@nestjs/common';
import { CreationAttributes } from 'sequelize';
import * as sequelizeTypescript from 'sequelize-typescript';

@Injectable()
export class CrudService<T extends sequelizeTypescript.Model> {
  protected readonly model: sequelizeTypescript.ModelCtor<T>;
  constructor(model: sequelizeTypescript.ModelCtor<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  findByPk(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async create(tData: CreationAttributes<T>): Promise<T> {
    return this.model.create(tData);
  }

  async patch(id: number, updateData: Partial<T>): Promise<T | null> {
    const instance = await this.model.findByPk(id);
    if (!instance) {
      return null;
    }
    Object.assign(instance, updateData);
    return instance.save();
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.model.destroy({
      where: { id: id as any },
    });
    return deletedCount > 0;
  }
}
