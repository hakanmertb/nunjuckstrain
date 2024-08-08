import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources/mongodb.datasource';
import {Product} from '../models/product.model';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Product, dataSource);
  }
}
