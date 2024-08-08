import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false, mongodb: {collection: 'Products'}}})
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}
export type ProductWithRelations = Product;
