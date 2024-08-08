import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Product} from '../models/product.model';
import {ProductRepository} from '../repositories/product.repository';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @post('/products')
  @response(200, {
    description: 'Product model instance',
    content: {'application/json': {schema: getModelSchemaRef(Product)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    product: Omit<Product, 'id'>,
  ): Promise<Product> {
    try {
      const createdProduct = await this.productRepository.create(product);
      console.log('Created product:', createdProduct);
      return createdProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
  @get('/products')
  @response(200, {
    description: 'Array of Product model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Product, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Product[]> {
    return this.productRepository.find();
  }

  @get('/products/{id}')
  @response(200, {
    description: 'Product model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Product, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<Product> {
    return this.productRepository.findById(id);
  }
}
