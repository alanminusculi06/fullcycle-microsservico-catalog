import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Category extends Entity {
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
